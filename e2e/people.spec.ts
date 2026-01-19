import { test, expect } from "@playwright/test"

test("filtering people by skill updates the table", async ({page}) => {
    await page.goto("/people");

    await page.getByRole("button", {name: "Filters" }).click();

    await page.getByRole("button", {name: "Azure"}).click();

    const table = page.getByRole("table")
    await expect(table.getByText("Jon Doe")).toBeVisible();
    await expect(table.getByText("Alice Brown")).toHaveCount(0);
})