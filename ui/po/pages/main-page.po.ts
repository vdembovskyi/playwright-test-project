import {Locator, Page} from '@playwright/test';

import { BasePage } from '../base-page.po';

export class MainPage extends BasePage {

  constructor(page:Page) {
    super(page, '/inventory.html');
  }

  readonly title: Locator = this.$('span[class="title"]');
  readonly addToCardBackpackButton: Locator = this.$('button[id="add-to-cart-sauce-labs-backpack"]');
  readonly removeBackpackButton: Locator = this.$('button[id="remove-sauce-labs-backpack"]');
  readonly shoppingCardButton: Locator = this.$('div[id="shopping_cart_container"]');
  readonly menuButton: Locator = this.$('button[id="react-burger-menu-btn"]');
  readonly logoutButton: Locator = this.$('a[id="logout_sidebar_link"]');

  async logout(){
    await this.menuButton.click();
    await this.logoutButton.click();
}

}
