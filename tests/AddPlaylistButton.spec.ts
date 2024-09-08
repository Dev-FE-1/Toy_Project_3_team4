import { expect } from '@playwright/test';

import { test as authTest } from './auth.setup';
import { generateRandomNumber } from '../src/utils/randomNumber';

const PLAYLIST_TITLE = `테스트 플레이리스트 ${generateRandomNumber()}`;

const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=G_yVcism96A';
const YOUTUBE_TITLE = '스프링 배치 5 : 11. 배치 처리5 : 테이블 to 엑셀';

authTest.setTimeout(30000);

authTest.describe('플레이리스트 추가', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
    await page.goto('/');

    await page.click('nav a[href^="/profile"]');
  });

  authTest(
    '플레이리스트를 추가되면 프로필 페이지에서 플레이리스트가 추가되어야 한다. 추가된 플레이리스트는 삭제 가능해야 한다.',
    async ({ page }) => {
      await page.click('nav a[href^="/profile"]');
      await page.click('[data-testid="tab-item"]:has-text("플리")');
      await page.click('[data-testid="add-playlist-button"]');
      await page.fill('[data-testid="playlist-title-input"]', PLAYLIST_TITLE);
      await page.click('[data-testid="full-button"]:has-text("추가하기")');
      await expect(page.locator('[data-testid="playlists-container"]')).toContainText(
        PLAYLIST_TITLE,
      );
      await page.click(`[data-testid="playlist-item"]:has-text("${PLAYLIST_TITLE}")`);

      await page.click('[data-testid="playlist-modal-open-button"]');
      await page.click('div:has-text("플리 삭제하기")');
      await expect(page.locator('[data-testid="playlists-container"]')).not.toContainText(
        PLAYLIST_TITLE,
      );
    },
  );

  authTest(
    '플레이리스트 추가를 취소하면 프로필 페이지로 이동한다. 플레이리스트가 추가되지 않아야한다.',
    async ({ page }) => {
      await page.click('nav a[href^="/profile"]');
      await page.click('[data-testid="tab-item"]:has-text("플리")');
      await page.click('[data-testid="add-playlist-button"]');
      await page.fill('[data-testid="playlist-title-input"]', PLAYLIST_TITLE);

      await page.click('button:has-text("취소하기")');
      await expect(page.locator('[data-testid="playlists-container"]')).not.toContainText(
        PLAYLIST_TITLE,
      );

      await page.click('nav a[href^="/"]');
    },
  );

  authTest(
    '플레이리스트를 생성하고, 해당 플레이리스트에 동영상을 추가하고, 추가된 동영상을 삭제할 수 있어야 한다.',
    async ({ page }) => {
      await page.click('nav a[href^="/profile"]');
      await page.click('[data-testid="tab-item"]:has-text("플리")');
      await page.click('[data-testid="add-playlist-button"]');
      await page.fill('[data-testid="playlist-title-input"]', PLAYLIST_TITLE);
      await page.click('[data-testid="full-button"]:has-text("추가하기")');

      await page.click(`[data-testid="playlist-item"]:has-text("${PLAYLIST_TITLE}")`);
      await page.click('[data-testid="playlist-modal-open-button"]');
      await page.click('div:has-text("플리에 동영상 추가하기")');
      await page.fill('[data-testid="video-url-input"]', YOUTUBE_LINK);
      await page.waitForTimeout(1000);
      await page.click('[data-testid="fit-button"]');
      await page.click('[data-testid="fit-button"]');

      await page.waitForSelector('[data-testid="video-thumbnail"]');
      await page.click('button:has-text("완료")');
      await page.waitForTimeout(1000);
      await page.locator(`[data-testid="video-title"]`).isVisible();
      await expect(page.locator(`[data-testid="video-title"]`)).toContainText(YOUTUBE_TITLE);

      await page.click('[data-testid="playlist-modal-open-button"]');
      await page.click('div:has-text("플리 삭제하기")');
      await expect(page.locator('[data-testid="playlists-container"]')).not.toContainText(
        PLAYLIST_TITLE,
      );
    },
  );
});
