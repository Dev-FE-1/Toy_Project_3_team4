import { test, expect, Page } from '@playwright/test';

import { test as authTest } from './auth.setup';

test.describe('SignInPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
    await page.waitForLoadState('networkidle');
  });

  test("페이지의 url은 '/signin'이어야한다", async ({ page }) => {
    await expect(page).toHaveURL('/signin');
  });

  test('페이지의 모든 요소가 화면에 표시되어야한다', async ({ page }) => {
    await expect(page.locator('div.swiper')).toBeVisible();

    const chatBubble = page.locator('p').filter({ hasText: '5초만에 시작하기' });
    await expect(chatBubble).toBeVisible();

    const signInButton = page.getByRole('button', { name: 'Google로 계속하기' });
    await expect(signInButton).toBeVisible();

    const description = page.locator('p.description');
    await expect(description).toContainText('최초 로그인 시 계정을 생성하며');
  });

  test('swiper가 올바르게 동작해야한다', async ({ page }) => {
    await expect(page.locator('div.swiper-wrapper')).toBeVisible();
    const activeSlide = page.locator('.swiper-slide-active');
    await expect(activeSlide).toBeVisible();
    await expect(activeSlide).toContainText('내 취향을 공유하고');
  });
});

authTest.describe('SignInPage - 파이어베이스 로그인', () => {
  authTest(
    '로그인 후 페이지의 url은 "/"이어야한다',
    async ({ page, auth }: { page: Page; auth }) => {
      await page.goto('/signin');
      await auth.login(page);
      await expect(page).toHaveURL('/');
    },
  );
  authTest('로그 아웃 후 페이지 url은 /siginin이어야 한다.', async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
    await expect(page).toHaveURL('/');
    await auth.logout(page);
    await expect(page).toHaveURL('/signin');
  });
});
