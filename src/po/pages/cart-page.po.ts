import { Locator, Page } from '@playwright/test';

import { BasePage } from '../base-page.po';

export class CartPage extends BasePage {

  constructor (page:Page){
    super(page, '/cart.html');
  }

  readonly inventoryItem: Locator = this.$('div[class="inventory_item_name"]');
  readonly removeBackpackButton: Locator = this.$('button[id="remove-sauce-labs-backpack"]');

}
