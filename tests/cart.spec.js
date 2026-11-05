
const { test, expect } = require('@playwright/test');

test('Add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // LOGIN
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();

    // Add Sauce Labs Backpack to the cart.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify that the cart badge displays 1.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Open the shopping cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();

    // Verify that Sauce Labs Backpack is displayed in the cart.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});
