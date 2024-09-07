import { test, expect } from '@playwright/test';

import { test as authTest } from './auth.setup';

authTest.setTimeout(10000);

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

  //   authTest('포스트가 없을 때 메시지가 표시되어야 한다', async ({ page }) => {
  //     // 포스트가 없는 상황을 시뮬레이션하는 로직이 필요할 수 있습니다
  //     const noPostsMessage = page.locator('text=포스트를 찾을 수 없습니다.');
  //     await expect(noPostsMessage).toBeVisible();
  //   });

  //   authTest('포스트가 있을 때 PostsTimeLine이 표시되어야 한다', async ({ page }) => {
  //     // 포스트가 있는 상황을 시뮬레이션하는 로직이 필요할 수 있습니다
  //     const postsTimeline = page.locator('.timeline');
  //     await expect(postsTimeline).toBeVisible();
  //   });

  //   authTest('스크롤 시 추가 포스트를 로드해야 한다', async ({ page }) => {
  //     // 초기 포스트 수를 확인
  //     const initialPostCount = await page.locator('.post').count();

  //     // 페이지 끝까지 스크롤
  //     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //     await page.waitForLoadState('networkidle');

  //     // 추가 포스트가 로드되었는지 확인
  //     const newPostCount = await page.locator('.post').count();
  //     expect(newPostCount).toBeGreaterThan(initialPostCount);
  //   });

  //   authTest('모든 포스트를 로드한 후 완료 메시지가 표시되어야 한다', async ({ page }) => {
  //     // 모든 포스트를 로드하는 로직 (여러 번의 스크롤이 필요할 수 있음)
  //     while ((await page.locator('text=모든 포스트를 확인했습니다!').count()) === 0) {
  //       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //       await page.waitForLoadState('networkidle');
  //     }

  //     const completionMessage = page.locator('text=모든 포스트를 확인했습니다!');
  //     await expect(completionMessage).toBeVisible();
  //   });

  //   authTest('맨 위로 가기 버튼이 작동해야 한다', async ({ page }) => {
  //     // 페이지 끝까지 스크롤
  //     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  //     // 맨 위로 가기 버튼 클릭
  //     const topButton = page.locator('button:has-text("맨 위로 가기")');
  //     await topButton.click();

  //     // 페이지 상단으로 스크롤되었는지 확인
  //     const scrollPosition = await page.evaluate(() => window.scrollY);
  //     expect(scrollPosition).toBe(0);
  //   });
});
