import { PageFixtures, pageFixtures } from './page-fixtures';
import { PlaywrightTestArgs, PlaywrightTestOptions, test as baseTest } from '@playwright/test';

export type CommonFixtures = PageFixtures & ConfigurationFixtures & PlaywrightTestArgs & PlaywrightTestOptions;
//@ts-ignpre
export type UseFunction = (...args: any[]) => Promise<void>;

export interface ConfigurationFixtures {
  config: {
    baseUrl: string;
  };
}

export const test = baseTest.extend<CommonFixtures>({
  ...pageFixtures,
});

export const expect = test.expect;
