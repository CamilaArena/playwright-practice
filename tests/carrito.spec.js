const { test, expect } = require('@playwright/test');

test('Agregar al carrito', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    // LOGIN
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
    
    //Agregue Sauce Labs Backpack al carrito.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //Verifique que el contador del carrito muestre 1.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    //Abra el carrito.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    //Verifique que aparezca el producto Sauce Labs Backpack.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});