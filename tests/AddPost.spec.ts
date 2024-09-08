import { expect } from '@playwright/test';

import { test as authTest } from './auth.setup';
import { generateRandomNumber } from '../src/utils/randomNumber';

const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=G_yVcism96A';
const POST_CONTENT = `새로운 테스트 포스트입니다-${generateRandomNumber()}`;

authTest.describe('AddPost', () => {
  authTest.beforeEach(async ({ page, auth }) => {
    await page.goto('/signin');
    await auth.login(page);
  });

  authTest('포스트를 추가하고 타임라인에 표시되는지 확인', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.click('button[data-testid="add-post-button"]');
    await page.click('text=링크로 동영상 추가');

    await expect(page).toHaveURL(/\/post\/add/);

    await page.fill('input[placeholder="YouTube 동영상 링크를 입력해주세요."]', YOUTUBE_LINK);

    await page.click('text=완료');

    await expect(page).toHaveURL(/\/post\/add\/newPost/);

    const textarea = page.locator('[data-testid=post-content-input]');
    await textarea.fill(POST_CONTENT);
    await expect(textarea).toHaveValue(POST_CONTENT);

    await page.click('button:has-text("공유하기")');

    await expect(page).toHaveURL('/');

    const newPost = page.locator('data-testid=post', { hasText: POST_CONTENT });
    await expect(newPost).toBeVisible();
  });
});
