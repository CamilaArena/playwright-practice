
const { test, expect } = require('@playwright/test');

test('Remove item from cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // LOGIN
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the Products page is displayed.
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();

    // ADD ITEM TO CART
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Open the shopping cart.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Remove the item from the cart.
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify that the cart badge disappears.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

    // Verify that the item is no longer displayed in the cart.
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
});
