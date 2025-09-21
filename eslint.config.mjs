import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin'
import { plugin } from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'no-console': 'error',
      '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }]
    }
  }
];

export default eslintConfig;
