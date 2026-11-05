const { test, expect } = require('@playwright/test');

test('Dropdown test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const dropdown = page.locator('#dropdown');
    //Select option 1
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
    //Select option 2
    await dropdown.selectOption('2');    
    await expect(dropdown).toHaveValue('2');
});