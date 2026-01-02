import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default defineConfig(
  nextVitals,
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylistic,
  globalIgnores([
    "eslint.config.mjs",
    "postcss.config.cjs",
    "prettier.config.cjs",
  ]),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
