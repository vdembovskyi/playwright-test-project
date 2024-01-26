import { CartPage, LoginPage, MainPage } from '@pages'
import { expect, test } from '@playwright/test';

test.describe('My test level 1', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });
    // @ts-check
    test.only('Check add to card goods', async ({page}) => {
        await expect(page.locator('[id="user-name"]')).toBeVisible();

        await page.locator('input[id="user-name"]').fill('standard_user');
        await page.locator('input[id="password"]').fill('secret_sauce');
        await page.locator('input[id="login-button"]').click();

        await expect(page.locator('span[class="title"]')).toHaveText('Products');

        await page.locator('button[id="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('button[id="remove-sauce-labs-backpack"]')).toHaveText('Remove');

        await page.locator('div[id="shopping_cart_container"]').click();
        await expect(page.locator('div[class="inventory_item_name"]')).toHaveText('Sauce Labs Backpack')

        await page.locator('button[id="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('div[class="inventory_item_name"]')).toHaveCount(0)
    });

    test.afterEach(async ({page}) => {
        await page.locator('button[id="react-burger-menu-btn"]').click();
        await page.locator('a[id="logout_sidebar_link"]').click();
    });
});



test.describe('My test level 2', () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await expect(loginPage.userName).toBeVisible();
        await loginPage.userName.fill('standard_user');
        await loginPage.password.fill('secret_sauce');
        await loginPage.loginButton.click();
    });
    // @ts-check
    test.only('Check add to card goods', async ({page}) => {

        const mainPage = new MainPage(page);
        const cartPage = new CartPage(page);

        await expect(mainPage.title).toHaveText('Products');
        await mainPage.addToCardBackpackButton.click();
        await expect(mainPage.removeBackpackButton).toHaveText('Remove');
        await mainPage.shoppingCardButton.click();

        await expect(cartPage.inventoryItem).toHaveText('Sauce Labs Backpack');
        await cartPage.removeBackpackButton.click();
        await expect(cartPage.inventoryItem).toHaveCount(0);
    });

    test.afterEach(async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.menuButton.click();
        await mainPage.logoutButton.click();
    });
});
