import { test, expect } from '@playwright/test';
import { PeoplePage } from '../pages/people.ts';

test('filtering people by skill updates the table', async ({ page }) => {
  const peoplePage = new PeoplePage(page);
  await peoplePage.goto();

  await peoplePage.filterButton.click();
  await peoplePage.azureButton.click();

  await expect(peoplePage.table.getByText('Jon Doe')).toBeVisible();
  await expect(peoplePage.table.getByText('Alice Brown')).toHaveCount(0);
});
