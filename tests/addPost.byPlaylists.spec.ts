import { expect } from '@playwright/test';

import { test as authTest } from './auth.setup';
import { generateRandomNumber } from '../src/utils/randomNumber';

// const YOUTUBE_ID = 'dQw4w9WgXcQ';
// const SECOND_YOUTUBE_ID = '9bZkp7q19';
const POST_CONTENT = `새로운 테스트 포스트입니다-${generateRandomNumber()}`;

// const YOUTUBE_LINK = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;
// const SECOND_YOUTUBE_LINK = `https://www.youtube.com/watch?v=${SECOND_YOUTUBE_ID}`;

authTest.describe('AddPost by playlists', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
  });

  authTest(
    '플레이리스트에 있는 유튜브 영상으로 포스트가 올라가면 타임라인에 표시 되어야한다.',
    async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL('/');

      await page.click('[data-testid="add-post-button"]');

      await page.click('text=플리에서 동영상 선택');

      await page.click('[data-testid="playlist-item"]:nth-child(1)');

      await page.click('[data-testid="playlist-select-video-item"]:nth-child(1)');
      await page.click('[data-testid="playlist-select-video-item"]:nth-child(2)');
      await page.click('text=완료');

      await expect(page.locator('[data-testid=post-content-input]')).toBeVisible();
      await page.fill('[data-testid=post-content-input]', POST_CONTENT);
      await page.click('button:has-text("공유하기")');

      await expect(page).toHaveURL('/');
      await expect(page.locator(`[data-testid=post] >> text=${POST_CONTENT}`)).toBeVisible();
    },
  );
});
