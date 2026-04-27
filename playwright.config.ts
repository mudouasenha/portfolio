import { defineConfig } from "@playwright/test";
import path from "node:path";

const bundledLibPath = path.resolve(
  process.cwd(),
  ".playwright-libs/usr/lib/x86_64-linux-gnu",
);
const ldLibraryPath = process.env.LD_LIBRARY_PATH
  ? `${bundledLibPath}:${process.env.LD_LIBRARY_PATH}`
  : bundledLibPath;

export default defineConfig({
  testDir: "./tests/a11y",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    launchOptions: {
      env: {
        LD_LIBRARY_PATH: ldLibraryPath,
      },
    },
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
  },
});
