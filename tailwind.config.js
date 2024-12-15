import jsPlugin from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'], 
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, 
      },
    },
  },
  jsPlugin.configs.recommended,
  {
    rules: {
      'quotes': ['error', 'single'], 
      'semi': ['error', 'always'], 
      'no-unused-vars': 'warn', 
      'no-console': 'off', 
      'indent': ['error', 2], 
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'], 
      'array-bracket-spacing': ['error', 'never'], 
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], 
    },
  },
  {
    files: ['tailwind.config.js'], 
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
