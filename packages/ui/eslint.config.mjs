import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';
import * as tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import * as graphqlEslint from '@graphql-eslint/eslint-plugin';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import eslintJS from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
            ecmaVersion: 12,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                tsconfigRootDir: __dirname,
                project: './tsconfig.json',
            },
        },
        extends: [
            eslintJS.configs.recommended,
            eslintConfigPrettier,
            reactHooks.configs['recommended-latest'],
            fixupConfigRules([react.configs.flat['recommended']]),
            typescriptEslint.configs['flat/eslint-recommended'],
        ],
        plugins: {
            prettier,
            '@typescript-eslint': typescriptEslint,
            'no-only-tests': noOnlyTests,
            '@graphql-eslint': graphqlEslint.default,
        },
        processor: graphqlEslint.processors.graphql,
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-only-tests/no-only-tests': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'react/jsx-max-props-per-line': [
                'error',
                {
                    maximum: {
                        single: 1,
                        multi: 1,
                    },
                },
            ],
            'object-curly-spacing': ['error', 'always'],
            'react/jsx-tag-spacing': 'error',
            'prettier/prettier': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        files: ['**/*.graphql'],
        languageOptions: {
            parser: graphqlEslint.parser,
        },
        extends: [
            graphqlEslint.configs['flat/schema-recommended'],
            graphqlEslint.configs['flat/operations-recommended'],
        ],
        plugins: {
            '@graphql-eslint': graphqlEslint.default,
        },
        rules: {
            '@graphql-eslint/known-type-names': 'error',
            '@graphql-eslint/require-selections': 'error',
        },
    },
    globalIgnores([
        'eslint.config.js',
        '.papi',
        '**/dist',
        '**/src/interfaces/**/*',
        '**/types-and-hooks.tsx',
        '**/build',
        '**/src/gql',
    ]),
]);
