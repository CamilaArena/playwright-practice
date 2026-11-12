const { test, expect } = require("@playwright/test");
/**
Open Sauce Demo and log in.
Locate the Sauce Labs Backpack product using .inventory_item and filter({ hasText: 'Sauce Labs Backpack' }).
Verify that its Add to cart button is visible.
Click on the Add to cart button.
Verify that the button changes to Remove.
Verify that the cart badge displays 1.
Click on Remove.
Verify that the Add to cart button is displayed again.
Verify that the cart badge disappears.
*/

test("Validate all products", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle(/Swag Labs/);
  // Enter username.
  await page.getByPlaceholder("Username").fill("standard_user");
  // Enter password.
  await page.getByPlaceholder("Password").fill("secret_sauce");
  // Click the Login button.
  await page.getByRole("button", { name: "Login" }).click();
  const product = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await expect(
    product.getByRole("button", { name: "Add to cart" }),
  ).toBeVisible();
  await product.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  await expect(product.getByRole("button", { name: "Remove" })).toBeVisible();
  await product.getByRole("button", { name: "Remove" }).click();
  await expect(
    product.getByRole("button", { name: "Add to cart" }),
  ).toBeVisible();
  await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
});
