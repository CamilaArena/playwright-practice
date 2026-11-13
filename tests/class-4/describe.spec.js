const { test, expect } = require("@playwright/test");

test.describe('Inventory tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page).toHaveURL(/inventory.html/);
    });

    test("Verify products count", async ({ page }) => {
        await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    test("Add to cart", async ({ page }) => {
        // Add Sauce Labs Backpack to the cart.
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Verify that the cart badge displays 1.
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
            "1",
        );
    });

});

test("Verify login page", async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});