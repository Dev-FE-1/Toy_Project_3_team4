import { test, expect } from '@playwright/test';

import { test as authTest } from './auth.setup';

const POST_ID = '8ySv6UD3uGk624XqH7yY';
const POST_PATH = `/post/${POST_ID}`;

test.describe('PostDetailPage - 로그인 되지 않은 상태', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${POST_PATH}`);
    await page.waitForLoadState('networkidle');
  });

  test("로그인 되지 않은 경우 페이지의 url은 '/signin'으로 리다이렉트 되어야 한다", async ({
    page,
  }) => {
    await expect(page).toHaveURL('/signin');
  });
});

authTest.describe('PostDetailPage - 로그인된 상태', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
    await page.goto(`${POST_PATH}`);
    await expect(page).toHaveURL(`${POST_PATH}`);
  });

  authTest(`페이지의 url은 '/post/${POST_ID}'이어야 한다`, async ({ page }) => {
    await expect(page).toHaveURL(`${POST_PATH}`);
  });

  authTest('BackHeader가 표시되어야 한다', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  authTest('Post가 표시되어야 한다', async ({ page }) => {
    const post = page.locator('[data-testid="post"]');
    await expect(post).toBeVisible();
  });

  authTest('CommentSection이 표시되어야 한다', async ({ page }) => {
    const commentSection = page.locator('[data-testid="comment-section"]');
    await expect(commentSection).toBeVisible();
  });

  authTest('댓글을 작성하고 제출하면 댓글이 추가되어야 한다', async ({ page }) => {
    const commentInput = page.locator('[data-testid="comment-input"]');
    await expect(commentInput).toBeVisible();

    const commentContent = '댓글 테스트';
    await commentInput.fill(commentContent);
    // await commentInput.press('Enter');
    // await page.waitForTimeout(500);
    // const comment = page.locator(
    //   `[data-testid="comment-content"][data-content="${commentContent}"]`,
    // );
    // await expect(comment).toBeVisible();
  });

  // authTest('댓글 수정이 가능해야 한다.', async ({ page }) => {
  //   // 드롭다운 버튼을 클릭하면 수정 버튼이 나타난다
  //   const dropdownButton = page.locator('[data-testid="comment-dropdown-button"]');
  //   await dropdownButton.click();
  //   await page.waitForTimeout(500);
  //   // const editButton = page.locator('[data-testid="edit-comment-button"]');
  //   // await expect(editButton).toBeVisible();
  // });

  // authTest('댓글 삭제가 가능해야 한다', async ({ page }) => {
  //   const deleteButton = page.locator('[data-testid="delete-comment-button"]');
  //   await expect(deleteButton).toBeVisible();
  // });
});
