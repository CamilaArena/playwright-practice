const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/inventory.html/);
});

test.afterEach(async ({ page }) => {
    console.log("Test Finished");
});

test("Verify products count", async ({ page }) => {
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});