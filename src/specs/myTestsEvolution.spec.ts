import { CartPage, LoginPage, MainPage } from '@pages';
import {USERS_LIST, USER_0_DATA} from "@data";
import { expect, test } from '@fixtures';
test.describe('My test level 1', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });
    // @ts-check
    test('Check creating an order', async ({page}) => {
        // login
        await page.locator('input[id="user-name"]').fill('standard_user');
        await page.locator('input[id="password"]').fill('secret_sauce');
        await page.locator('input[id="login-button"]').click();
        // add goods to cart
        await expect(page.locator('span[class="title"]')).toHaveText('Products');
        await page.locator('button[id="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('button[id="remove-sauce-labs-backpack"]')).toHaveText('Remove');
        // go to the cart
        await page.locator('div[id="shopping_cart_container"]').click();
        await expect(page.locator('div[class="inventory_item_name"]')).toHaveText('Sauce Labs Backpack');
        // proceed checkout
        await page.locator('button[id="checkout"]').click();
        // fill the checkout form
        await page.locator('input[id="first-name"]').fill('firstname');
        await page.locator('input[id="last-name"]').fill('lastname');
        await page.locator('input[id="postal-code"]').fill('00000');
        await page.locator('input[id="continue"]').click();
        // check that user is on the Checkout Overview page
        await expect(page.locator('span[class="title"]')).toHaveText('Checkout: Overview');
        await page.locator('button[id="finish"]').click();
        // check that order was made
        await expect(page.locator('h2[class="complete-header"]')).toHaveText('Thank you for your order!');
    });

    test.afterEach(async ({page}) => {
        await page.locator('button[id="react-burger-menu-btn"]').click();
        await page.locator('a[id="logout_sidebar_link"]').click();
    });
});

test.describe('My test level 2 Page Objects', () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await loginPage.userName.fill('standard_user');
        await loginPage.password.fill('secret_sauce');
        await loginPage.loginButton.click();
    });
    // @ts-check
    test('Check add to card goods', async ({page}) => {
        const mainPage = new MainPage(page);
        const cartPage = new CartPage(page);
        // add goods to cart
        await mainPage.addToCardBackpackButton.click();
        await expect(mainPage.removeBackpackButton).toHaveText('Remove');
        await mainPage.shoppingCardButton.click();
        // go to the cart
        await expect(cartPage.inventoryItem).toHaveText('Sauce Labs Backpack');
        // proceed checkout
        await cartPage.checkoutButton.click();
        // fill the checkout form
        await cartPage.firstnameInputField.fill('firstname');
        await cartPage.lastnameInputField.fill('lastname');
        await cartPage.zipcodeInputField.fill('00000');
        await cartPage.continueButton.click();
        // check that user is on the Checkout Overview page
        await expect(cartPage.title).toHaveText('Checkout: Overview');
        await cartPage.finishButton.click();
        // check that order was made
        await expect(cartPage.compleatHeader).toHaveText('Thank you for your order!');
    });

    test.afterEach(async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.menuButton.click();
        await mainPage.logoutButton.click();
    });
});


test.describe('My test level 3 Fixtures', () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.visit();
        await loginPage.userName.fill('standard_user');
        await loginPage.password.fill('secret_sauce');
        await loginPage.loginButton.click();
    });
    // @ts-check
    test('Check add to card goods', async ({mainPage, cartPage}) => {
        // add goods to cart
        await mainPage.addToCardBackpackButton.click();
        await expect(mainPage.removeBackpackButton).toHaveText('Remove');
        await mainPage.shoppingCardButton.click();
        // go to the cart
        await expect(cartPage.inventoryItem).toHaveText('Sauce Labs Backpack');
        // proceed checkout
        await cartPage.checkoutButton.click();
        // fill the checkout form
        await cartPage.firstnameInputField.fill('firstname');
        await cartPage.lastnameInputField.fill('lastname');
        await cartPage.zipcodeInputField.fill('00000');
        await cartPage.continueButton.click();
        // check that user is on the Checkout Overview page
        await expect(cartPage.title).toHaveText('Checkout: Overview');
        await cartPage.finishButton.click();
        // check that order was made
        await expect(cartPage.compleatHeader).toHaveText('Thank you for your order!');
    });

    test.afterEach(async ({mainPage}) => {
        await mainPage.menuButton.click();
        await mainPage.logoutButton.click();
    });
});


test.describe('My test level 4 Test steps', () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.visit();
        await loginPage.userName.fill('standard_user');
        await loginPage.password.fill('secret_sauce');
        await loginPage.loginButton.click();
    });
    // @ts-check
    test('Check add to card goods', async ({mainPage, cartPage}) => {

        await test.step('add goods to cart', async() =>{
            await mainPage.addToCardBackpackButton.click();
            await expect(mainPage.removeBackpackButton).toHaveText('Remove');
            await mainPage.shoppingCardButton.click();
        })

        await test.step('proceed checkout', async() => {
            await expect(cartPage.inventoryItem).toHaveText('Sauce Labs Backpack');
            await cartPage.checkoutButton.click();
        });

        await test.step('fill and submit the checkout form', async() => {
            await cartPage.firstnameInputField.fill('firstname');
            await cartPage.lastnameInputField.fill('lastname');
            await cartPage.zipcodeInputField.fill('00000');
            await cartPage.continueButton.click();
        });

        await test.step('check that user is on the Checkout Overview page', async() => {
            await expect(cartPage.title).toHaveText('Checkout: Overview');
            await cartPage.finishButton.click();
        });

        await test.step('check that order was made', async() => {
            await expect(cartPage.compleatHeader).toHaveText('Thank you for your order!');
        });
    });

    test.afterEach(async ({mainPage}) => {
        await mainPage.menuButton.click();
        await mainPage.logoutButton.click();
    });
});


test.describe('My test level 5 Functionality grouping (login logout, formData)', () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.visit();
        await loginPage.login('standard_user', 'secret_sauce');
    });
    // @ts-check
    test('Check add to card goods', async ({mainPage, cartPage}) => {
        await test.step('add goods to cart', async() =>{
            await mainPage.addToCardBackpackButton.click();
            await expect(mainPage.removeBackpackButton).toHaveText('Remove');
            await mainPage.shoppingCardButton.click();
        })

        await test.step('proceed checkout', async() => {
            await expect(cartPage.inventoryItem).toHaveText('Sauce Labs Backpack');
            await cartPage.checkoutButton.click();
        });

        await test.step('fill and submit the checkout form', async() => {
            await cartPage.addFormData('firstname', 'lastname', '00000');
            await cartPage.continueButton.click();
        });

        await test.step('check that user is on the Checkout Overview page', async() => {
            await expect(cartPage.title).toHaveText('Checkout: Overview');
            await cartPage.finishButton.click();
        });

        await test.step('check that order was made', async() => {
            await expect(cartPage.compleatHeader).toHaveText('Thank you for your order!');
        });
    });

    test.afterEach(async ({mainPage}) => {
        await mainPage.logout();
    });
});

test.describe('My test level 6 test data', () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.visit();
        await loginPage.login('standard_user', 'secret_sauce');
    });
    // @ts-check
    test('Check add to card goods', async ({mainPage, cartPage}) => {
        await test.step('add goods to cart', async() =>{
            await mainPage.addToCardBackpackButton.click();
            await expect(mainPage.removeBackpackButton).toHaveText('Remove');
            await mainPage.shoppingCardButton.click();
        })

        await test.step('proceed checkout', async() => {
            await expect(cartPage.inventoryItem).toHaveText('Sauce Labs Backpack');
            await cartPage.checkoutButton.click();
        });

        await test.step('fill and submit the checkout form', async() => {
            await cartPage.fillFormWith(USER_0_DATA);
            await cartPage.continueButton.click();
        });

        await test.step('check that user is on the Checkout Overview page', async() => {
            await expect(cartPage.title).toHaveText('Checkout: Overview');
            await cartPage.finishButton.click();
        });

        await test.step('check that order was made', async() => {
            await expect(cartPage.compleatHeader).toHaveText('Thank you for your order!');
        });
    });

    test.afterEach(async ({mainPage}) => {
        await mainPage.logout();
    });
});
