const { test, expect } = require('@playwright/test');

test('Verificar título de la página', async ({ page }) => {

    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

});