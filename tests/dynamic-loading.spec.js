const { test, expect } = require("@playwright/test");

/*
Navigate to the exercise page.
Verify that the Start button is visible.
Verify that Hello World! is initially hidden.
Click on Start.
Wait for Hello World! to appear.
Verify that the text is exactly Hello World!.
*/
test("Verify dynamic loading", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
  const startButton = page.getByRole("button", { name: "Start" });
  await expect(startButton).toBeVisible();
  await expect(page.getByText("Hello World!")).toBeHidden();
  await startButton.click();
  const message = page.getByText("Hello World!");
  // Wait for the dynamically loaded message to become visible.
  await message.waitFor({ state: "visible" });
  await expect(message).toHaveText("Hello World!");
});

/*
Navigate to the page.
Locate the Start button.
Locate the spinner using page.locator('#loading').
Click on Start.
Verify that the spinner is visible.
Verify that the spinner disappears.
Verify that Hello World! is displayed.
*/
test("Verify loading indicator", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
  const startButton = page.getByRole("button", { name: "Start" });
  const spinner = page.locator("#loading");
  await startButton.click();
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 10000 });
  const message = page.getByText("Hello World!");
  await expect(message).toHaveText("Hello World!");
});
