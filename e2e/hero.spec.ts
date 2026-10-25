import { expect, test } from "@playwright/test";
import { moThiep } from "./helpers";

// Tên viết thẳng theo spec, cố ý không đọc từ `wedding`, để test không tự đúng theo cấu hình.
test("bìa hiện Our Love Begins và tên đầy đủ của cô dâu, chú rể", async ({ page }) => {
  await page.goto("/");
  await moThiep(page);

  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeVisible();
  await expect(page.getByText("Bùi Đức Hiền")).toBeVisible();
  await expect(page.getByText("Phan Thị Mai Linh")).toBeVisible();
});
