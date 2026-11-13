const { test, expect } = require("@playwright/test");

async function login(page, username, password) {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}

test("Login with valid credentials", async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
});

test("Login with invalid credentials", async ({ page }) => {
    await login(page, 'invalid_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]'))
    .toHaveText('Epic sadface: Username and password do not match any user in this service');
});