const { test, expect } = require("@playwright/test");

/**
1. Navigate to Sauce Demo and log in using standard_user and secret_sauce.
2. Verify that exactly 6 products are displayed.
3. Locate the Sauce Labs Backpack product using filter().
4. Add it to the cart.
5. Locate the Sauce Labs Bike Light product and add it to the cart as well.
6. Verify that the cart badge displays 2.
7. Click on the cart icon to navigate to the cart page.
8. Verify that exactly 2 products are displayed in the cart.
9. Verify that the names of both products are correct.
10. Remove Sauce Labs Backpack from the cart.
11. Verify that only Sauce Labs Bike Light remains in the cart.
12. Verify that the cart badge displays 1.
*/

test("Verify shopping cart functionality", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle(/Swag Labs/);

  // LOGIN
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory.html/);

  //Verify that there are only 6 items
  await expect(page.locator(".inventory_item")).toHaveCount(6);

  // Add Sauce Labs Backpack to the cart.
  const item1 = await page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });
  await item1.locator("#add-to-cart-sauce-labs-backpack").click();

  // Add Sauce Labs Bike Light to the cart.
  const item2 = await page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Bike Light" });
  await item2.locator("#add-to-cart-sauce-labs-bike-light").click();

  //Cart indicator shows 2
  const cartIndicator = await page.locator(".shopping_cart_badge");
  await expect(cartIndicator).toHaveText("2");

  //Go to cart
  await page.locator(".shopping_cart_link").click();

  //Verify there are only 2 items in the cart
  const items = await page.locator(".cart_item");
  await expect(items).toHaveCount(2);

  //Verify names
  await expect(items.nth(0).locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack",
  );
  await expect(items.nth(1).locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Bike Light",
  );

  //Delete first item
  await items.nth(0).locator("#remove-sauce-labs-backpack").click();

  //Check if there is only 1 item left
  await expect(items).toHaveCount(1);
  await expect(items.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Bike Light",
  );
  await expect(items.filter({ hasText: "Sauce Labs Backpack" })).toHaveCount(0);

  //Cart indicator shows
  await expect(cartIndicator).toHaveText("1");
});
