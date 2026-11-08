const { test, expect } = require('@playwright/test');
/**
Abrir Sauce Demo e iniciar sesión.
Localizar el producto Sauce Labs Backpack utilizando .inventory_item y filter({ hasText: 'Sauce Labs Backpack' }).
Verificar que su botón Add to cart esté visible.
Hacer clic en ese botón.
Verificar que el botón cambió a Remove.
Verificar que el indicador del carrito muestra 1.
Hacer clic en Remove.
Verificar que vuelve a aparecer Add to cart.
Verificar que el indicador del carrito desapareció.
 */

test('Validate all products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    // Enter username.
    await page.getByPlaceholder('Username').fill('standard_user');
    // Enter password.
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // Click the Login button.
    await page.getByRole('button', { name: 'Login' }).click();
    const product = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(product.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await product.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(product.getByRole('button', { name: 'Remove' })).toBeVisible();
    await product.getByRole('button', { name: 'Remove' }).click();
    await expect(product.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});