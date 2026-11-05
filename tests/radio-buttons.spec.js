const { test, expect } = require('@playwright/test');

test('Radio button test', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');

    const yesRadio = page.getByRole('radio', { name: 'Yes' });
    const impressiveRadio = page.getByRole('radio', { name: 'Impressive' });

    await yesRadio.check();
    await expect(yesRadio).toBeChecked();

    await impressiveRadio.check();
    await expect(yesRadio).not.toBeChecked();
    await expect(impressiveRadio).toBeChecked();
});