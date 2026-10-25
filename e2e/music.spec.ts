import { expect, test } from "@playwright/test";
import { giaNhacNen, moThiep } from "./helpers";

test("mở thiệp thì nhạc phát; bấm nút nhạc thì tắt, bấm lần nữa thì bật lại", async ({ page }) => {
  await giaNhacNen(page);
  await page.goto("/");
  await moThiep(page);

  const nutNhac = page.getByRole("button", { name: "Nhạc nền" });
  await expect(nutNhac).toHaveAttribute("aria-pressed", "true");

  await nutNhac.click();
  await expect(nutNhac).toHaveAttribute("aria-pressed", "false");

  await nutNhac.click();
  await expect(nutNhac).toHaveAttribute("aria-pressed", "true");
});

test("không tải được nhạc thì nút nhạc hiện đang tắt, không báo sai là đang phát", async ({ page }) => {
  const loi: Error[] = [];
  page.on("pageerror", (e) => loi.push(e));
  let daGoiNhac = false;
  await page.route("**/music/**", (route) => {
    daGoiNhac = true;
    return route.abort();
  });
  await page.goto("/");
  await moThiep(page);

  await expect.poll(() => daGoiNhac).toBe(true);
  const nutNhac = page.getByRole("button", { name: "Nhạc nền" });
  await expect(nutNhac).toHaveAttribute("aria-pressed", "false");

  // Bấm thử lại vẫn tắt, vì nhạc vẫn không tải được.
  await nutNhac.click();
  await expect(nutNhac).toHaveAttribute("aria-pressed", "false");
  expect(loi).toEqual([]);
});

test("bấm SKIP thì nhạc cũng phát", async ({ page }) => {
  await giaNhacNen(page);
  await page.goto("/");

  await page.getByRole("button", { name: "SKIP" }).click();

  await expect(page.getByRole("button", { name: "Nhạc nền" })).toHaveAttribute("aria-pressed", "true");
});
