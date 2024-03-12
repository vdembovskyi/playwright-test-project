import * as po from "../po/pages";

import { CommonFixtures, UseFunction } from "ui/fixtures/fixtures";

import { Mocker } from "../utils/mocker";

export interface PageFixtures {
  mocker: Mocker; //this one fakes the responses

  //EXAMPLE
  cartPage: po.CartPage;
  loginPage: po.LoginPage;
  mainPage: po.MainPage;
}
export const pageFixtures = {
  mocker: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new Mocker(page));
  },

  //EXAMPLE fixtures
  cartPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new po.CartPage(page));
  },

  loginPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new po.LoginPage(page));
  },

  mainPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new po.MainPage(page));
  },
};
