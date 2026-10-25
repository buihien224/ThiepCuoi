import { expect, test, type Locator } from "@playwright/test";
import { wedding } from "../src/content/wedding";
import { moThiep } from "./helpers";

// Phần lớn chữ viết thẳng theo spec, cố ý không đọc từ `wedding`. Riêng Interview và bản đồ thì
// ticket yêu cầu kiểm theo cấu hình (thêm/bớt câu hỏi, có/không có `mapEmbedUrl`), nên đọc `wedding`.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await moThiep(page);
});

async function dinh(locator: Locator) {
  const khung = await locator.boundingBox();
  if (!khung) throw new Error("Không thấy phần cần đo");
  return khung.y;
}

test("các phần nội dung nằm đúng thứ tự: Lời mời → Interview → Save The Date → Location → Lời kết", async ({
  page,
}) => {
  const tieuDe = [
    page.getByRole("heading", { name: "Trân trọng kính mời" }).last(),
    page.getByRole("heading", { name: "Interview" }),
    page.getByRole("heading", { name: "Save The Date" }),
    page.getByRole("heading", { name: "Location" }),
    page.getByRole("heading", { name: /hẹn gặp bạn/i }),
  ];
  const viTri = [];
  for (const t of tieuDe) viTri.push(await dinh(t));
  expect(viTri).toEqual([...viTri].sort((a, b) => a - b));
  expect(viTri[0]).toBeGreaterThan(await dinh(page.getByRole("heading", { name: "Our Love Begins" })));
});

test("Lời mời có dòng TRÂN TRỌNG KÍNH MỜI và đoạn văn mời", async ({ page }) => {
  const loiMoi = page.getByRole("region", { name: "Trân trọng kính mời" });
  await expect(loiMoi.getByRole("heading", { name: "Trân trọng kính mời" })).toBeVisible();
  await expect(loiMoi.getByText("Sự hiện diện của bạn là niềm vinh hạnh")).toBeVisible();
});

test("mọi câu hỏi Interview trong cấu hình đều hiện", async ({ page }) => {
  const interview = page.getByRole("region", { name: "Interview" });
  await expect(interview.getByText("Câu chuyện của chúng mình")).toBeVisible();
  for (const { q } of wedding.interview) {
    await expect(interview.getByText(q, { exact: true })).toBeVisible();
  }
});

test("Save The Date hiện giờ, thứ, ngày dương lịch, ngày âm lịch trong ngoặc và lịch tháng 11/2026", async ({
  page,
}) => {
  const saveTheDate = page.getByRole("region", { name: "Save The Date" });
  await expect(saveTheDate.getByText("11 giờ 00 · Thứ Bảy", { exact: true })).toBeVisible();
  await expect(saveTheDate.getByText("28.11.2026", { exact: true })).toBeVisible();
  await expect(saveTheDate.getByText("(Tức ngày 20 tháng 10 năm Bính Ngọ)", { exact: true })).toBeVisible();
  await expect(saveTheDate.getByRole("img", { name: "Lịch tháng 11 năm 2026, ngày cưới 28.11.2026" })).toBeVisible();
});

test("Location hiện tên nhà hàng, sảnh, địa chỉ và nút Mở Google Maps trỏ đúng mapUrl", async ({ page }) => {
  const location = page.getByRole("region", { name: "Location" });
  await expect(location.getByText("[Tên nhà hàng]", { exact: true })).toBeVisible();
  await expect(location.getByText("[Sảnh tiệc]", { exact: true })).toBeVisible();
  await expect(location.getByText("[Địa chỉ nhà hàng]", { exact: true })).toBeVisible();

  const nut = location.getByRole("link", { name: "Mở Google Maps" });
  await expect(nut).toBeVisible();
  await expect(nut).toHaveAttribute("href", wedding.venue.mapUrl);
  await expect(nut).toHaveAttribute("target", "_blank");
  await expect(nut).toHaveAttribute("rel", /noopener/);
});

// Nội dung là module tĩnh nên bản build chỉ có một giá trị `mapEmbedUrl`: test nhánh đang dùng, bỏ qua nhánh kia.
test("chưa có mapEmbedUrl thì không có khung bản đồ", async ({ page }) => {
  test.skip(wedding.venue.mapEmbedUrl !== null, "Cấu hình đang có mapEmbedUrl");
  await expect(page.getByRole("heading", { name: "Location" })).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("có mapEmbedUrl thì bản đồ nhúng đúng link đó", async ({ page }) => {
  test.skip(wedding.venue.mapEmbedUrl === null, "Cấu hình chưa có mapEmbedUrl");
  const location = page.getByRole("region", { name: "Location" });
  await expect(location.locator("iframe")).toHaveAttribute("src", wedding.venue.mapEmbedUrl ?? "");
});

test("Lời kết có câu hẹn gặp bạn, khối 28 Nov 2026 INVITATION và footer", async ({ page }) => {
  const loiKet = page.getByRole("region", { name: /hẹn gặp bạn/i });
  await expect(loiKet.getByRole("heading", { name: /hẹn gặp bạn/i })).toBeVisible();
  await expect(loiKet.getByText("28 Nov 2026", { exact: true })).toBeVisible();
  await expect(loiKet.getByText("INVITATION", { exact: true })).toBeVisible();
  // Footer nằm trong <main> nên không mang vai trò `contentinfo`; tìm thẳng thẻ footer.
  await expect(page.locator("footer")).toContainText("Đức Hiền & Mai Linh");
});
