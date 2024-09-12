import { expect } from '@playwright/test';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { PlaylistModel } from './../src/types/playlist';
import { PostModel } from './../src/types/post';
import { test as authTest, db } from './auth.setup';

authTest.describe('포스트 상세 페이지', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
    await page.goto('/');
  });

  authTest('포스트 컴포넌트에서 플레이리스트 제목이 표시되어야 한다.', async ({ page }) => {
    await page.waitForSelector('[data-testid="playlist-title"]');

    const playlistTitle = await page.locator('[data-testid="playlist-title"]').first().innerText();

    expect(playlistTitle).not.toBeNull();
  });

  authTest('공개 플레이리스트의 제목이 올바르게 표시되어야 한다', async ({ page, auth }) => {
    const { playlistData } = await setupTest(page, auth, 'public');

    const displayedTitle = await page.locator('[data-testid="playlist-title"]').textContent();
    expect(displayedTitle).toContain(playlistData?.title);
  });

  authTest('비공개 플레이리스트의 제목이 본인에게는 표시되어야 한다', async ({ page, auth }) => {
    const { playlistData } = await setupTest(page, auth, 'private-own');

    const displayedTitle = await page.locator('[data-testid="playlist-title"]').textContent();
    expect(displayedTitle).toContain(playlistData?.title);
  });

  authTest(
    '타인의 비공개 플레이리스트는 "비공개 플레이리스트"로 표시되어야 한다',
    async ({ page, auth }) => {
      await setupTest(page, auth, 'private-other');

      const displayedTitle = await page.locator('[data-testid="playlist-title"]').textContent();
      expect(displayedTitle).toBe('비공개 플레이리스트');
    },
  );

  authTest(
    '삭제된 플레이리스트는 "알 수 없는 플레이리스트"로 표시되어야 한다',
    async ({ page, auth }) => {
      const { playlistId } = await setupTest(page, auth, 'deleted');

      const playlistDoc = await getDoc(doc(db, 'playlists', playlistId as string));

      if (!playlistDoc.exists()) {
        const displayedTitle = await page.locator('[data-testid="playlist-title"]').textContent();
        expect(displayedTitle).toBe('알 수 없는 플레이리스트');
      } else {
        console.log('삭제된 플레이리스트를 시뮬레이션하기 위한 데이터가 없습니다.');
      }
    },
  );
});

interface SetupTestReturn {
  postData?: PostModel;
  playlistId?: string;
  playlistData?: PlaylistModel;
}

const setupPublicTest = async (page): Promise<SetupTestReturn> => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCollection);

  for (const postDoc of postsSnapshot.docs) {
    const postData = postDoc.data() as PostModel;
    const { playlistId } = postData;

    const playlistDoc = await getDoc(doc(db, 'playlists', playlistId));
    const playlistData = playlistDoc.data() as PlaylistModel;

    if (playlistData && playlistData.isPublic) {
      await page.goto(`/post/${postDoc.id}`);
      await page.waitForSelector('[data-testid="playlist-title"]');
      return { postData, playlistId, playlistData };
    }
  }

  throw new Error('공개 플레이리스트를 가진 포스트를 찾을 수 없습니다.');
};

const setupPrivateOwnTest = async (page, auth): Promise<SetupTestReturn> => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(query(postsCollection, where('userId', '==', auth.UID)));

  for (const postDoc of postsSnapshot.docs) {
    const postData = postDoc.data() as PostModel;
    const { playlistId } = postData;

    const playlistDoc = await getDoc(doc(db, 'playlists', playlistId));
    const playlistData = playlistDoc.data() as PlaylistModel;

    if (playlistData && !playlistData.isPublic && playlistData.userId === auth.UID) {
      await page.goto(`/post/${postDoc.id}`);
      await page.waitForSelector('[data-testid="playlist-title"]');
      return { playlistData };
    }
  }

  throw new Error('본인의 비공개 플레이리스트를 가진 포스트를 찾을 수 없습니다.');
};

const setupPrivateOtherTest = async (page, auth): Promise<SetupTestReturn> => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(query(postsCollection, where('userId', '!=', auth.UID)));

  for (const postDoc of postsSnapshot.docs) {
    const postData = postDoc.data() as PostModel;
    const { playlistId } = postData;

    const playlistDoc = await getDoc(doc(db, 'playlists', playlistId));
    const playlistData = playlistDoc.data() as PlaylistModel;

    if (playlistData && !playlistData.isPublic && playlistData.userId !== auth.UID) {
      await page.goto(`/post/${postDoc.id}`);
      await page.waitForSelector('[data-testid="playlist-title"]');
      return { playlistData };
    }
  }

  throw new Error('타인의 비공개 플레이리스트를 가진 포스트를 찾을 수 없습니다.');
};

const setupDeletedTest = async (page): Promise<SetupTestReturn> => {
  try {
    const { postId, postData } = await findDeletedPlaylistPost();
    await page.goto(`/post/${postId}`);
    return { postData, playlistId: postData.playlistId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findDeletedPlaylistPost = async () => {
  const postsCollection = collection(db, 'posts');
  const playlistsCollection = collection(db, 'playlists');

  const postsSnapshot = await getDocs(postsCollection);

  for (const postDoc of postsSnapshot.docs) {
    const postData = postDoc.data() as PostModel;
    const { playlistId } = postData;

    const playlistDoc = await getDoc(doc(playlistsCollection, playlistId));

    if (!playlistDoc.exists()) {
      return { postId: postDoc.id, postData };
    }
  }

  throw new Error('삭제된 플레이리스트를 가진 포스트를 찾을 수 없습니다.');
};

const setupTest = async (
  page,
  auth,
  condition: 'public' | 'private-own' | 'private-other' | 'deleted',
) => {
  switch (condition) {
    case 'public':
      return await setupPublicTest(page);
    case 'private-own':
      return await setupPrivateOwnTest(page, auth);
    case 'private-other':
      return await setupPrivateOtherTest(page, auth);
    case 'deleted':
      return await setupDeletedTest(page);
    default:
      throw new Error(`유효하지 않은 조건: ${condition}`);
  }
};
