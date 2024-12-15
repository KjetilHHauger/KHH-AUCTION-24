import jsPlugin from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript features
      sourceType: 'module', // Enable ES Modules
      globals: {
        ...globals.browser, // Include browser globals like `window`, `document`
      },
    },
  },
  jsPlugin.configs.recommended, // Apply ESLint's recommended rules
  {
    rules: {
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Enforce semicolons
      'no-unused-vars': 'warn', // Warn about unused variables
      'no-console': 'off', // Allow `console` statements
      'indent': ['error', 2], // Enforce consistent 2-space indentation
      'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multi-line objects/arrays
      'object-curly-spacing': ['error', 'always'], // Enforce spacing inside curly braces
      'array-bracket-spacing': ['error', 'never'], // Disallow spacing inside array brackets
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Enforce spacing in object keys
    },
  },
];
