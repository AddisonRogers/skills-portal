import type { Page, Locator } from '@playwright/test';

export class PeoplePage {
  readonly filterButton: Locator;
  readonly azureButton: Locator;
  readonly table: Locator;

  constructor(public readonly page: Page) {
    this.filterButton = this.page.getByRole('button', { name: 'Filters' });
    this.azureButton = this.page.getByRole('button', { name: 'Azure' });
    this.table = this.page.getByRole('table');
  }

  async goto() {
    await this.page.goto('/people');
  }
}
