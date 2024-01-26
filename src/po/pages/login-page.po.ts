import { Locator, Page } from '@playwright/test';

import { BasePage } from '../base-page.po';

export class LoginPage extends BasePage {

  constructor (page:Page){
    super(page, '/');
  }

  readonly userName: Locator = this.$('[id="user-name"]');
  readonly password: Locator = this.$('input[id="password"]');
  readonly loginButton: Locator = this.$('input[id="login-button"]');

}
