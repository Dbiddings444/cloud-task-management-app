import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'
import vueParser from 'vue-eslint-parser'
export default defineConfig([
  // ESLint expects an array in flat config mode
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue: pluginVue,
      prettier: prettierPlugin,
    },
    rules: {
      // Load Vue 3 recommended rules
      ...pluginVue.configs['flat/recommended'].rules,

      // Load Prettier adjustments (turns off conflicting rules)
      ...prettierConfig.rules,

      // Your custom rules
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': off,
    },
  },
])
