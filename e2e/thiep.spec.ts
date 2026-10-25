import { expect, test, type Page } from "@playwright/test";
import { keoLen, moThiep } from "./helpers";

function trangDangKhoa(page: Page) {
  return page.evaluate(() => getComputedStyle(document.documentElement).overflow);
}

test("Thiệp còn đóng thì chưa xem được bìa, trang bị khoá cuộn và không có nút SKIP", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeHidden();
  await expect(page.getByRole("button", { name: "SKIP" })).toHaveCount(0);
  expect(await trangDangKhoa(page)).toBe("hidden");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator("main")).toHaveAttribute("aria-hidden", "true");
});

test("vuốt Thiệp lên thì vào được nội dung chính", async ({ page }) => {
  await page.goto("/");
  await moThiep(page);

  await expect(page.locator("main")).not.toHaveAttribute("inert");
  expect(await trangDangKhoa(page)).not.toBe("hidden");
});

test("chạm vào Thiệp thì mở", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Mở thiệp" }).click();

  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeHidden();
  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeVisible();
});

test("nhấn Enter khi Thiệp có focus thì mở", async ({ page }) => {
  await page.goto("/");

  const thiep = page.getByRole("button", { name: "Mở thiệp" });
  await thiep.focus();
  await expect(thiep).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(thiep).toBeHidden();
  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeVisible();
});

test("kéo một đoạn ngắn rồi thả thì Thiệp bật về, không mở và trang vẫn bị khoá", async ({ page }) => {
  await page.goto("/");

  await keoLen(page, 60);
  // Chờ Thiệp bật về xong, để chắc nó không mở muộn.
  await page.waitForTimeout(600);

  await expect(page.locator("[data-phong-bi-dong]")).toBeAttached();
  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeVisible();
  expect(await trangDangKhoa(page)).toBe("hidden");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
});

test("máy bật giảm chuyển động vẫn mở được thiệp", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await moThiep(page);
});

// Nội dung viết thẳng theo spec, cố ý không đọc từ `wedding`, để test không tự đúng theo cấu hình.
// Kiểm tra sau khi mở, vì Thiệp đang đóng cũng có tên và ngày.
test("Lòng thiệp hiện đúng thứ, ngày, giờ, ngày âm lịch và nhà hàng", async ({ page }) => {
  await page.goto("/");
  await moThiep(page);

  // Lời mời, Save The Date và Location bên dưới cũng có những chữ này, nên chỉ tìm trong Lòng thiệp.
  const longThiep = page.getByRole("region", { name: "Lòng thiệp" });
  await expect(longThiep.getByText("Trân trọng kính mời", { exact: true })).toBeVisible();
  await expect(longThiep.getByText("Thứ Bảy · 28.11.2026 · 11 giờ 00", { exact: true })).toBeVisible();
  await expect(longThiep.getByText("Tức ngày 20 tháng 10 năm Bính Ngọ", { exact: true })).toBeVisible();
  await expect(longThiep.getByText("[Tên nhà hàng] · [Sảnh tiệc]", { exact: true })).toBeVisible();
  await expect(longThiep.getByText("[Địa chỉ nhà hàng]", { exact: true })).toBeVisible();
});

test("tải lại trang thì Thiệp lại đóng", async ({ page }) => {
  await page.goto("/");
  await moThiep(page);

  await page.reload();

  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeHidden();
  expect(await trangDangKhoa(page)).toBe("hidden");
});

test("gợi ý cuộn xuống trên Lòng thiệp đưa khách tới Hero", async ({ page }) => {
  await page.goto("/");
  await moThiep(page);

  await page.getByRole("link", { name: "cuộn xuống" }).click();

  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeInViewport();
});
