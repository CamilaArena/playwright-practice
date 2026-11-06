const { test, expect } = require('@playwright/test');

/*
Navegar a Sauce Demo.
Iniciar sesión con standard_user y secret_sauce.
Localizar todos los productos utilizando .inventory_item.
Verificar que existen 6 productos.
Seleccionar el tercer producto utilizando nth().
Obtener su nombre utilizando textContent().
Mostrar ese nombre en la terminal con console.log().
Verificar que el tercer producto contiene un botón Add to cart visible.
*/
test('Nth locators', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    // Enter username.
    await page.getByPlaceholder('Username').fill('standard_user');
    // Enter password.
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // Click the Login button.
    await page.getByRole('button', { name: 'Login' }).click();
    //Verify there are 6 products
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    //Select third product using nth
    const products = page.locator('.inventory_item');
    const product = products.nth(2);
    //Get name and print it
    const name = await product.locator('.inventory_item_name').textContent();
    console.log(name);
    //Verify add to cart button is visible
    const button = product.getByRole('button', { name: 'Add to cart' });
    await expect(button).toBeVisible();
});


/*
Navegar a Sauce Demo e iniciar sesión.
Localizar todos los productos usando .inventory_item.
Obtener la cantidad de productos con count().
Crear un bucle for que recorra todos los productos.
Dentro del bucle, obtener el nombre de cada producto usando .inventory_item_name y textContent().
Mostrar cada nombre en la terminal con console.log().
*/
test('Print all product names', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    // Enter username.
    await page.getByPlaceholder('Username').fill('standard_user');
    // Enter password.
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // Click the Login button.
    await page.getByRole('button', { name: 'Login' }).click();
    const products = page.locator('.inventory_item');
    const total = await products.count();

    for (let i = 0; i < total; i++) {
        const product = products.nth(i);
        const name = await product.locator('.inventory_item_name').textContent();
        console.log(name);
    }
});


/**
Navegar a Sauce Demo e iniciar sesión.
Verificar que existan exactamente 6 productos.
Recorrer todos los productos usando un for.
Verificar que cada producto tenga un nombre visible.
Verificar que cada producto tenga un botón Add to cart visible.
Obtener el precio de cada producto, convertirlo a número y verificar que sea mayor que cero. 
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
    const products = page.locator('.inventory_item');
    const total = await products.count();

    for (let i = 0; i < total; i++) {
        const product = products.nth(i);
        const name = await product.locator('.inventory_item_name');
        await expect(name).toBeVisible();
        const nameText = await name.textContent();
        const button = product.getByRole('button', { name: 'Add to cart' });
        await expect(button).toBeVisible();
        const priceText = await product
            .locator('.inventory_item_price')
            .textContent();
        const price = Number(priceText.replace('$', ''));
        expect(price).toBeGreaterThan(0);
    }
});