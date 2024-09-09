import { test, expect } from '@playwright/test';

import { test as authTest } from './auth.setup';
import { generateRandomNumber } from '../src/utils/randomNumber';

const POST_ID = '8ySv6UD3uGk624XqH7yY';
const POST_PATH = `/post/${POST_ID}`;
const commentContent = `댓글 테스트-${generateRandomNumber()}`;

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

    await commentInput.fill(commentContent);
    await commentInput.press('Enter');
    await page.waitForTimeout(500);
    const comment = page.locator(`[data-testid="comment-content"]`, {
      hasText: commentContent,
    });
    await expect(comment).toBeVisible();
  });

  authTest('댓글 수정이 가능해야 한다.', async ({ page }) => {
    const commentInput = page.locator('[data-testid="comment-input"]');
    await commentInput.fill(commentContent);
    await commentInput.press('Enter');
    await page.waitForTimeout(500);

    const dropdownButton = page.locator('[data-testid="comment-dropdown-button"]').first();
    await dropdownButton.click();

    await page.click('text=댓글 수정');

    const editInput = page.locator('[data-testid="comment-input"]').first();
    const editedContent = `수정된 ${commentContent}`;
    await editInput.fill(editedContent);
    await editInput.press('Enter');

    const editedComment = page
      .locator(`[data-testid="comment-content"]`, {
        hasText: editedContent,
      })
      .first();
    await expect(editedComment).toBeVisible();
  });

  authTest('댓글 삭제가 가능해야 한다', async ({ page }) => {
    const commentInput = page.locator('[data-testid="comment-input"]');
    await commentInput.fill(commentContent);
    await commentInput.press('Enter');
    await page.waitForTimeout(500);

    const comment = page
      .locator(`[data-testid="comment-content"]`, {
        hasText: commentContent,
      })
      .first();
    await expect(comment).toBeVisible();

    const dropdownButton = page.locator('[data-testid="comment-dropdown-button"]').first();
    await dropdownButton.click();

    await page.click('text=댓글 삭제');

    page.on('dialog', (dialog) => dialog.accept());

    await expect(comment).not.toBeVisible();
  });
});
