const { test, expect } = require('@playwright/test');

test('Verificar login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    // COMPLETAR USUARIO
    await page.getByPlaceholder('Username').fill('standard_user');
    // COMPLETAR CONTRASEÑA
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // HACER CLIC EN LOGIN
    await page.getByRole('button', { name: 'Login' }).click();
    // VERIFICAR QUE APARECE PRODUCTS
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
});