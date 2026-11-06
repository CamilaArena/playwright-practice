const { test, expect } = require('@playwright/test');


/*
Parte A — first() y last()
1. Iniciar sesión en Sauce Demo con standard_user y secret_sauce.
2. Localizar todos los botones Add to cart.
3. Verificar que inicialmente existen 6 botones.
4. Hacer clic en el primero utilizando first().
5. Hacer clic en el último botón Add to cart que quede disponible utilizando last().
6. Verificar que el carrito muestra 2 productos.
*/
test('Advanced locators A', async ({ page }) => {
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

    const buttons = page.getByRole('button', { name: 'Add to cart' });
    await expect(buttons).toHaveCount(6);
    await buttons.first().click();
    await buttons.last().click();
    //Check if both items have been added to chart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

/*
Navegar a https://www.saucedemo.com/.
Iniciar sesión con standard_user y secret_sauce.
Localizar todos los contenedores .inventory_item.
Utilizar filter({ hasText: 'Sauce Labs Backpack' }) para identificar la mochila.
Hacer clic en el botón Add to cart que pertenece a ese producto.
Verificar que el carrito muestra "1".*/
test('Advanced locators B', async ({ page }) => {
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

    const producto = page.locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });
    const boton = producto.getByRole('button', { name: 'Add to cart' });
    await boton.click();
    //Check if both items have been added to chart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});