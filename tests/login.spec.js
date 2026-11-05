
const { test, expect } = require('@playwright/test');

test('Verify successful login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // Enter username.
    await page.getByPlaceholder('Username').fill('standard_user');

    // Enter password.
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Click the Login button.
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the user is redirected to the Products page.
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
});
