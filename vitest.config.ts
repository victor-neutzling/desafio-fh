import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: ["node_modules", "dist", "vitest.config.ts"],
    },
    include: ["src/**/*.spec.ts"],
    exclude: ["node_modules", "dist"],
    clearMocks: true,
    restoreMocks: true,
  },
  plugins: [tsconfigPaths()],
});
