import { expect, test } from "@playwright/test";
import { moThiep } from "./helpers";

test("bìa chưa xem được khi phong bì còn đóng; bấm Mở thiệp thì vào nội dung chính", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeHidden();

  await moThiep(page);
});

test("bấm SKIP thì vào thẳng nội dung chính", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "SKIP" }).click();

  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeHidden();
});

test("máy bật giảm chuyển động vẫn mở được thiệp", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await moThiep(page);
});
