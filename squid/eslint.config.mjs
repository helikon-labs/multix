import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintJS from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslintJS.configs.recommended,
    allConfig: eslintJS.configs.all,
});

export default defineConfig([
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: { ...globals.node },
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            prettier,
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },
    globalIgnores([
        'lib/**/*',
        'db/**/*',
        'src/types/**/*',
        'src/model/generated/**/*',
        '**/.prettierrc.mjs',
    ]),
]);
