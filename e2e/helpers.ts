import { expect, type Page } from "@playwright/test";

// Phong bì che nội dung chính, nên mọi test vào thiệp đều phải bấm qua nó trước.
export async function moThiep(page: Page) {
  await page.getByRole("button", { name: "Mở thiệp" }).click();
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
