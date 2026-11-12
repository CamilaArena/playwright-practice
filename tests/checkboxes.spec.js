const { test, expect } = require("@playwright/test");

test("Checkbox test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await page.locator('input[type="checkbox"]').first().uncheck();
  await expect(checkbox).not.toBeChecked();
});
