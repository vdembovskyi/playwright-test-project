import { Locator, Page } from "@playwright/test";

import { BasePage } from "../base-page.po";
import { UserFormData } from "ui/interfaces";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, "/cart.html");
  }

  readonly inventoryItem: Locator = this.$('div[class="inventory_item_name"]');
  readonly removeBackpackButton: Locator = this.$(
    'button[id="remove-sauce-labs-backpack"]',
  );
  readonly checkoutButton: Locator = this.$('button[id="checkout"]');
  readonly cancelButton: Locator = this.$('button[id="cancel"]');
  readonly firstnameInputField: Locator = this.$('input[id="first-name"]');
  readonly lastnameInputField: Locator = this.$('input[id="last-name"]');
  readonly zipCodeInputField: Locator = this.$('input[id="postal-code"]');
  readonly continueButton: Locator = this.$('input[id="continue"]');
  readonly title: Locator = this.$('span[class="title"]');
  readonly finishButton: Locator = this.$('button[id="finish"]');
  readonly compleatHeader: Locator = this.$('h2[class="complete-header"]');

  async addFormData(firstname: string, lastname: string, zipcode: string) {
    await this.firstnameInputField.fill(firstname);
    await this.lastnameInputField.fill(lastname);
    await this.zipCodeInputField.fill(zipcode);
  }
  async fillFormWith(userData: UserFormData) {
    if (userData.firstname)
      await this.firstnameInputField.fill(userData.firstname);
    if (userData.lastname)
      await this.lastnameInputField.fill(userData.lastname);
    if (userData.zipcode) await this.zipCodeInputField.fill(userData.zipcode);
  }
}
