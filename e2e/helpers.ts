import { expect, type Page } from "@playwright/test";

// Kéo chuột từ giữa Thiệp lên `px` pixel rồi thả, chia nhiều bước để Motion `drag` nhận được chuyển động.
// Kéo chậm (mỗi nấc 10px cách nhau 40ms, khoảng 250px/s, dưới ngưỡng vuốt nhanh): chuột của Playwright
// đi rất nhanh, nếu không thì kéo ngắn cũng thành "vuốt nhanh" và Thiệp mở. Như vậy chỉ quãng kéo quyết định.
export async function keoLen(page: Page, px: number) {
  const thiep = page.getByRole("button", { name: "Mở thiệp" });
  const khung = await thiep.boundingBox();
  if (!khung) throw new Error("Không thấy Thiệp để kéo");
  const x = khung.x + khung.width / 2;
  const y = khung.y + khung.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let keo = 10; keo <= px; keo += 10) {
    await page.mouse.move(x, y - keo);
    await page.waitForTimeout(40);
  }
  await page.mouse.up();
}

// Thiệp che nội dung chính, nên mọi test vào thiệp đều phải vuốt mở nó trước.
// Kéo khoảng 60% chiều cao màn hình, vượt xa ngưỡng mở 30%.
export async function moThiep(page: Page) {
  const manHinh = page.viewportSize();
  if (!manHinh) throw new Error("Không có kích thước màn hình");
  await keoLen(page, manHinh.height * 0.6);

  await expect(page.getByRole("button", { name: "Mở thiệp" })).toBeHidden();
  await expect(page.getByRole("heading", { name: "Our Love Begins" })).toBeVisible();
}

// Repo không chứa file nhạc thật, nên test thay nhạc nền bằng 1 giây im lặng dạng WAV (8 kHz, mono, 8-bit).
export async function giaNhacNen(page: Page) {
  await page.route("**/music/**", (route) =>
    route.fulfill({ contentType: "audio/wav", body: silentWav(8000) }),
  );
}

function silentWav(samples: number) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + samples, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // độ dài khối fmt
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(8000, 24); // sample rate
  header.writeUInt32LE(8000, 28); // byte rate
  header.writeUInt16LE(1, 32); // block align
  header.writeUInt16LE(8, 34); // bits per sample
  header.write("data", 36);
  header.writeUInt32LE(samples, 40);
  // PCM 8-bit không dấu: 128 là im lặng.
  return Buffer.concat([header, Buffer.alloc(samples, 128)]);
}
