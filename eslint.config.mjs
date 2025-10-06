// import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig({
  files: ["**/*.{js,mjs,cjs,vue}"],
  plugins: {
    vue: pluginVue,
    prettier: prettierPlugin,
  },
  extends: [
  // "js/recommended",
    pluginVue.configs["flat/essential"],
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
});
