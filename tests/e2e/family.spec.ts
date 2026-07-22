import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "ar"] as const) {
  test(`${locale} owner is accessible, hydrated and keyboard usable`, async ({
    page,
  }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(`/${locale}`, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("article.member-card")).toHaveCount(6);
    await expect(page.locator("img.member-portrait")).toHaveCount(1);

    const accessibility = await new AxeBuilder({ page })
      .exclude("[data-netlify-deploy-id]")
      .analyze();
    expect(accessibility.violations).toEqual([]);

    await page.keyboard.press("Tab");
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();

    const targetLocale = locale === "en" ? "ar" : "en";
    await expect(page.locator(`a[href="/${targetLocale}"]`)).toHaveAttribute(
      "hrefLang",
      targetLocale,
    );

    if ((testInfo.project.use.viewport?.width ?? 0) <= 820) {
      const menu = page.locator(".menu-button");
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#primary-navigation")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }

    await page.screenshot({
      path: testInfo.outputPath(`${locale}-full-page.png`),
      fullPage: true,
    });
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}

test("unknown route remains a navigable noindex 404", async ({ page }) => {
  const response = await page.goto("/not-in-the-directory", {
    waitUntil: "networkidle",
  });
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Go to the English directory" })).toHaveAttribute(
    "href",
    "/en",
  );
  await expect(page.getByRole("link", { name: "الانتقال إلى الدليل العربي" })).toHaveAttribute(
    "href",
    "/ar",
  );
  const accessibility = await new AxeBuilder({ page })
    .exclude("[data-netlify-deploy-id]")
    .analyze();
  expect(accessibility.violations).toEqual([]);
});
