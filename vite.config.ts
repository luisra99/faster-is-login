import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "IdentityProviderList",
      fileName: "identity-provider-list",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@mui/material", "@mui/icons-material"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
