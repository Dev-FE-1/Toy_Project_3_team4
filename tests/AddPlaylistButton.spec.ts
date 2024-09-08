import { expect } from '@playwright/test';

import { test as authTest } from './auth.setup';
import { generateRandomNumber } from '../src/utils/randomNumber';

const PLAYLIST_TITLE = `테스트 플레이리스트 ${generateRandomNumber()}`;

authTest.describe('플레이리스트 추가', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
    await page.goto('/');

    // 2. 네비바에서 프로필 링크 클릭
    await page.click('nav a[href^="/profile"]');
  });

  authTest(
    '플레이리스트를 추가되면 프로필 페이지에서 플레이리스트가 추가되야한다.',
    async ({ page }) => {
      await page.click('nav a[href^="/profile"]');
      await page.click('[data-testid="tab-item"]:has-text("플리")');
      await page.click('[data-testid="add-playlist-button"]');
      await page.fill('[data-testid="playlist-title-input"]', PLAYLIST_TITLE);

      //비공개로 설정
      // await page.click('[data-testid="playlist-visibility-toggle"]');

      await page.click('[data-testid="full-button"]:has-text("추가하기")');
      await expect(page.locator('[data-testid="playlists-container"]')).toContainText(
        PLAYLIST_TITLE,
      );
    },
  );

  authTest('플레이리스트 추가를 취소할 수 있어야 한다.', async ({ page }) => {
    await page.click('nav a[href^="/profile"]');
    await page.click('[data-testid="tab-item"]:has-text("플리")');
    await page.click('[data-testid="add-playlist-button"]');
    await page.fill('[data-testid="playlist-title-input"]', PLAYLIST_TITLE);

    await page.click('button:has-text("취소하기")');
    await expect(page.locator('[data-testid="playlists-container"]')).not.toContainText(
      PLAYLIST_TITLE,
    );
  });
});
