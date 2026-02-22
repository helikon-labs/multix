const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const { fixupConfigRules } = require('@eslint/compat');
const tsParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-plugin-prettier');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const graphqlEslint = require('@graphql-eslint/eslint-plugin');
const noOnlyTests = require('eslint-plugin-no-only-tests');
const js = require('@eslint/js');

module.exports = defineConfig([
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
            js.configs.recommended,
            require('eslint-config-prettier'),
            reactHooks.configs['recommended-latest'],
            ...fixupConfigRules([react.configs.flat['recommended']]),
            typescriptEslint.configs['flat/eslint-recommended'],
        ],
        plugins: {
            prettier,
            '@typescript-eslint': typescriptEslint,
            'no-only-tests': noOnlyTests,
            '@graphql-eslint': graphqlEslint,
        },
        processor: '@graphql-eslint/graphql',
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
            parser: graphqlEslint,
        },
        extends: [
            graphqlEslint.configs['flat/schema-recommended'],
            graphqlEslint.configs['flat/operations-recommended'],
        ],
        plugins: {
            '@graphql-eslint': graphqlEslint,
        },
        rules: {
            '@graphql-eslint/known-type-names': 'error',
            '@graphql-eslint/require-selections': 'error',
        },
    },
    globalIgnores([
        '**/dist',
        '**/src/interfaces/**/*',
        '**/types-and-hooks.tsx',
        '**/build',
        '**/src/gql',
        '**/eslint.config.js',
    ]),
]);
