
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,

  use: {
    baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    trace: "on-first-retry",
    headless: true,
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 120 * 1000,
  },
});
