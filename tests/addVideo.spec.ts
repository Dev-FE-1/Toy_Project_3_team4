import { expect } from '@playwright/test';

import { test as authTest } from './auth.setup';

const YOUTUBE_ID = 'dQw4w9WgXcQ';
const SECOND_YOUTUBE_ID = '9bZkp7q19';

const YOUTUBE_LINK = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;
const SECOND_YOUTUBE_LINK = `https://www.youtube.com/watch?v=${SECOND_YOUTUBE_ID}`;

authTest.describe('플레이리스트에 유튜브 영상 추가', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
  });

  authTest('플레이리스트에 비디오 추가 기능 테스트', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.click('[data-testid="add-post-button"]');

    await page.click('text=플리에서 동영상 선택');
    await expect(page).toHaveURL('/post/add/selectPli');

    await page.click('.playlist-item >> nth=0');

    await page.fill('input[placeholder="YouTube 동영상 링크를 입력해주세요."]', YOUTUBE_LINK);

    await page.click('button:has-text("추가")');

    const addedVideo = page.locator('.playlist-contents-item', { hasText: YOUTUBE_ID });
    await expect(addedVideo).toBeVisible();

    await page.fill(
      'input[placeholder="YouTube 동영상 링크를 입력해주세요."]',
      SECOND_YOUTUBE_LINK,
    );
    await page.click('button:has-text("추가")');

    const secondAddedVideo = page.locator('.playlist-contents-item', {
      hasText: SECOND_YOUTUBE_ID,
    });
    await expect(secondAddedVideo).toBeVisible();

    await page.click('button:has-text("완료")');

    await expect(page).toHaveURL(/\/playlist\/[\w-]+/);

    await expect(page.locator('.playlist-contents-item', { hasText: YOUTUBE_ID })).toBeVisible();
    await expect(
      page.locator('.playlist-contents-item', { hasText: SECOND_YOUTUBE_ID }),
    ).toBeVisible();
  });
});
