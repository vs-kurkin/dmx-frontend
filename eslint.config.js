import js from '@eslint/js'
import tsLintPlugin from '@typescript-eslint/eslint-plugin'
import tsLintParser from '@typescript-eslint/parser'
import vueLintPlugin from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  ...vueLintPlugin.configs['flat/recommended'],

  {
    files: [ '**/*.ts' ],
    ignores: ["src/types/components.d.ts"],
    ...tsLintPlugin.configs.strictTypeChecked,
    ...tsLintPlugin.configs.stylisticTypeChecked,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsLintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsLintPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': [ 'warn', { 'fixToUnknown': true } ],
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
    },
  },

  {
    files: [ '**/*.vue' ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    plugins: vueLintPlugin,
  },
]
