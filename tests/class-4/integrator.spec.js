const { test, expect } = require("@playwright/test");

async function login(page, username, password) {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('Cart tests', () => {

    test.beforeEach(async ({ page }) => {
        await login(page, "standard_user", "secret_sauce");
        await expect(page).toHaveURL(/inventory.html/);

    });

    test("Verify products count", async ({ page }) => {
        await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    test("Add one product to cart", async ({ page }) => {
        // Add Sauce Labs Backpack to the cart.
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        // Verify that the cart badge displays 1.
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
            "1",
        );
    });

    test("Add two products to cart", async ({ page }) => {
        // Add Sauce Labs Backpack to the cart.
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        // Add Sauce Labs bike light to the cart.
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        // Verify that the cart badge displays 1.
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
            "2",
        );
    });

    test.afterEach(() => {
        console.log("Cart test finished");
    });
});

test("Login with invalid credentials", async ({ page }) => {
    await login(page, 'invalid_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]'))
    .toHaveText('Epic sadface: Username and password do not match any user in this service');
});
