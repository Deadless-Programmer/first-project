import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,

  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-unused-expressions":"error",
      "prefer-const":"error",
      "no-console":"warn",
      "no-undef":"error"
    },
    "globals":"readonly"
  },
]);

module.exports = [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
];

