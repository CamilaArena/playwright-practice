
const { test, expect } = require('@playwright/test');

test('Verify login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // Enter username.
    await page.getByPlaceholder('Username').fill('standard_user');

    // Enter incorrect password.
    await page.getByPlaceholder('Password').fill('wrong_password');

    // Click the Login button.
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the user remains on the login page.
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Verify that the error message is displayed.
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});
