const { test, expect } = require('@playwright/test');

test('Verificar login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    // COMPLETAR USUARIO
    await page.getByPlaceholder('Username').fill('standard_user');
    // COMPLETAR CONTRASEÑA
    await page.getByPlaceholder('Password').fill('wrong_password');
    // HACER CLIC EN LOGIN
    await page.getByRole('button', { name: 'Login' }).click();
    // VERIFICAR QUE SIGUE EN LOGIN
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});