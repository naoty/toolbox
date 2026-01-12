import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

export default defineConfig(
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    extends: [js.configs.recommended],
  },
  {
    files: ["*.ts", "*.tsx"],
    extends: [ts.configs.recommended],
  },
  prettier,
);
