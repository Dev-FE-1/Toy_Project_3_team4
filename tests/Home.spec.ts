import { test, expect } from '@playwright/test';

import { test as authTest } from './auth.setup';

const MAX_SCROLL_ATTEMPTS = 500;

test.describe('HomePage - 로그인 되지 않은 상태', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test("로그인 되지 않은 경우 페이지의 url은 '/signin'으로 리다이렉트 되어야 한다", async ({
    page,
  }) => {
    await expect(page).toHaveURL('/signin');
  });
});

authTest.describe('HomePage - 로그인된 상태', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  authTest("페이지의 url은 '/'이어야 한다", async ({ page }) => {
    await expect(page).toHaveURL('/');
  });

  authTest('LogoHeader가 표시되어야 한다', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  authTest('포스트가 있을 때 PostsTimeLine이 표시되어야 한다', async ({ page }) => {
    const postsTimeline = page.locator('[data-testid="timeline"]');
    await expect(postsTimeline).toBeVisible();
  });

  authTest('스크롤 시 추가 포스트를 로드해야 한다', async ({ page }) => {
    await page.waitForSelector('[data-testid="post"]');
    const initialPostCount = await page.locator('[data-testid="post"]').count();

    const lastPost = page.locator('[data-testid="post"]').last();
    await lastPost.scrollIntoViewIfNeeded();

    await page.waitForFunction(
      (initialCount) => document.querySelectorAll('[data-testid="post"]').length > initialCount,
      initialPostCount,
      { timeout: 5000 },
    );

    const newPostCount = await page.locator('[data-testid="post"]').count();
    expect(newPostCount).toBeGreaterThan(initialPostCount);
  });

  authTest('모든 포스트를 로드한 후 완료 메시지가 표시되어야 한다', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="timeline"]');

    let previousPostCount = 0;
    let currentPostCount = 0;
    let scrollAttempts = 0;
    const maxScrollTries = MAX_SCROLL_ATTEMPTS;

    while (scrollAttempts < maxScrollTries) {
      previousPostCount = currentPostCount;
      currentPostCount = await page.locator('[data-testid="post"]').count();

      if (currentPostCount === previousPostCount && currentPostCount > 0) {
        break;
      }

      const lastPost = page.locator('[data-testid="post"]').last();
      await lastPost.scrollIntoViewIfNeeded();
      await lastPost.scrollIntoViewIfNeeded();

      await page.waitForFunction(
        (initialCount) => document.querySelectorAll('[data-testid="post"]').length >= initialCount,
        currentPostCount,
        { timeout: 5000 },
      );

      try {
        await page.waitForFunction(
          () => !document.querySelector('[data-testid="loading-indicator"]'),
          { timeout: 5000 },
        );
      } catch (error) {
        console.warn('로딩 인디케이터가 사라지지 않았습니다.');
      }

      scrollAttempts++;
    }

    const completionMessage = page.locator('text=모든 포스트를 확인했습니다!');
    await expect(completionMessage).toBeVisible({ timeout: 10000 });

    if (!(await completionMessage.isVisible())) {
      await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
    }
  });
});
