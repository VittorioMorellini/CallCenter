import { test, expect } from '@playwright/experimental-ct-react';
import { JsxElement } from 'typescript';
import AgencyDetail from './detail';

test('Detail agency test', async ({ page, mount }) => {
  await page.goto('https://playwright.dev/');  
  const component = await mount(<AgencyDetail />);
  
  // Expect a title "to contain" a substring.
  await expect(component).toHaveText('Agency');

  // // create a locator
  // const getStarted = component.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(component).toHaveURL(/.*intro/);
});
