import { Page } from "@playwright/test";
export class Mocker {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async setMock(expression: string, body: any, status = 200) {
    await this.page.route(new RegExp(expression), (route) => {
      // console.log(route.request().postData());
      // console.log(route.request().method());
      route.fulfill({
        status: status,
        body: JSON.stringify(body),
      });
    });
  }
}
