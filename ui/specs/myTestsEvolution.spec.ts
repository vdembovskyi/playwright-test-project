import { CartPage, LoginPage, MainPage } from 'ui/po/pages';
import { USERS_LIST, USER_0_DATA } from "ui/data";
import { expect, test } from 'ui/fixtures/fixtures';

/*
This is an example spec for educational purposes
This spec holds SAME tests written in different levels of structure/readability and quality
The tests are the SAME, you can follow along what changes

Test: Add goods to the basket and create an order
*/

test.describe('My test level 1', () => {
    /*
        Level 1
        implementation is not really readable at all
        Also we have to give the same Selector for some elements multiple times
        We are repeating ourselves a lot

        1. We added a test.beforeEach hook function that runs before every test and placed navigation into it
        Result: No need to put navigation into tests (what we put in beforeEach will run BEFORE EACH test)
        More information: https://playwright.dev/docs/api/class-test#test-before-each-1

        2. We added the 'baseUrl' into the configuration file (ui/ui.config.ts)
        Result: No need for full URL, we just need to provide a resource '/'
        Also it is easy to run the same tests on dev or test environments
        Some more information: https://playwright.dev/docs/test-webserver#adding-a-baseurl
    */

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
/*
        Level 2 Changes:
        1. We added a Page Object for login, main and card pages ('ui/po/pages/')
        Result:
        a. 'elements/selectors' are now stored in one place.
        (if this element changes on the web page we will only need to change it in 1 place to fix the tests)
        Some more information: https://playwright.dev/docs/pom
        There are many more benefits of using Page Object Model
        b. the test became much mor readable

*/

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
        await cartPage.zipCodeInputField.fill('00000');
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
/*
        Level 3 Changes:
        1. We added test fixtures:
        Until now we were creating the instance of TextBoxPo directly in the test:
                    const loginPage = new LoginPage(page);
                    const mainPage = new MainPage(page);
                    const cartPage = new CartPage(page);
        Some more information: https://playwright.dev/docs/test-fixtures
        What you need to know is how to create a new fixture:
        a. Create a Page Object (example: 'ui/po/pages/login-page.po.ts')
        b. Add it to the index file ('ui/po/pages/index/ts')
        c. Add the fixture in fixture file ('fixtures/page-fixtures.ts')
        d. use the fixture in your test
                example:  test('name of the test', async ({fixtureName}) =>{
*/
    test.beforeEach(async ({loginPage}) => {
        await loginPage.visit();
      // we can use the .visit() function from the BasePage
      // Some information: https://www.typescripttutorial.net/typescript-tutorial/typescript-inheritance/
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
        await cartPage.zipCodeInputField.fill('00000');
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
/*
        Level 4 Changes:
        1. Adding test Steps
        This makes everything much more readable in the report
        Some more info https://playwright.dev/docs/api/class-test#test-step
*/

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
            await cartPage.zipCodeInputField.fill('00000');
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


test.describe('My test level 5 Functionality grouping (login, logout, addFormData)', () => {
    /*
        Level 5 Changes:
        Creating login, logout, addFormData methods
        */

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
  //this test is designed to fail (remove the skip() if you want to run it)
  //Visual test should be run in docker container Locally and normal on CI/CD
  //to run the test use `npm run visual -- --run`
  //this will trigger a script in scripts.sh to run the tests inside the docker
    /*
        Level 6*:

        Changes:
        a) Created a new interface/type to group the arguments. (ui/interfaces/example.int.ts) UserFormData
        b) Created a UserData file to store user data (ui/data/example.data.ts) of a newly created type UserFormData
        c) A new function fillFormWith() that takes only one argument of a type UserFormData

        What was accomplished with this:
        a) We have single function that accepts only 1 argument.( this argument is of type we just created UserFormData)
        In this case we lowered the count from 3 arguments to one. But it might have been 15 fields.(if form has more fields)
        b) We created an instant of actual User. We can have multiple users for different use cases.
        c) The function is now working with optional fields (imagine some fields are mandatory and some are not)

        Examples for better understanding:
        a) We create a new dish type called Pizza.
        It's mandatory to have round dough, other ingredients like pineapple are optional.
        But all options are defined. We have a list of possible ingredients.(pineapple, olives, chase etc)
        b) Here we are creating an Actual Pizza. For example Peperoni Pizza where we define what ingredients it actually has.
        c) Here we created a shortcut function.
        Instead of ordering pizza with: Tomatoes, Cheese, Olives, Peperoni
        We now simply order: Peperoni pizza
        */

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


test.describe('My test level 7 Data Driven test @visual', () => {
    /*
        Level 7:
        Lets add some Data Driven tests into the mix
        "Filling the Form test" will actually run couple times depending on how long the user list is.
        More Details: https://playwright.dev/docs/test-parameterize
        */
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
    //check out this loop
    //test name should be unique for each test (sometimes we might want to use indexes if we don't have unique attributes)
    //note: notice we are not using regular "quotes" but back `ticks`
    //this example is only for demonstration (in real test it is useless because at the end we use only one USER_DATA from list
    for (const user of USERS_LIST) {
        await test.step(`fill and submit the checkout form ${user.firstname}`, async() => {
        await cartPage.fillFormWith(user);
    });
    }
    await cartPage.continueButton.click();

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

