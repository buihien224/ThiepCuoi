import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 4173);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    // Thiệp chủ yếu được mở trên điện thoại.
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Luôn test trên bản export tĩnh, giống hệt thứ được deploy.
    command: `pnpm build && pnpm exec serve out -l ${PORT} --no-clipboard`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
