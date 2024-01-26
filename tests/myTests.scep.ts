import { expect, test } from '@playwright/test';

// @ts-check
test.only('First Test', async ({page}) => {
    await page.goto('https://www.saucedemo.com');

    await expect(page.locator('[id="user-name"]')).toBeVisible();
});
