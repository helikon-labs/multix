module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },
    plugins: ['react', 'prettier', '@typescript-eslint', 'no-only-tests'],
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
        trailingComma: 'off',
        'object-curly-spacing': ['error', 'always'],
        'react/jsx-tag-spacing': 'error',
        'prettier/prettier': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/react-in-jsx-scope': 'off',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            processor: '@graphql-eslint/graphql',
        },
        {
            files: ['*.graphql'],
            extends: 'plugin:@graphql-eslint/schema-recommended',
            rules: {
                '@graphql-eslint/known-type-names': 'error',
            },
        },
        {
            files: ['*.graphql'],
            extends: ['plugin:@graphql-eslint/operations-recommended'],
            rules: {
                '@graphql-eslint/require-selections': 'error',
            },
        },
    ],
    ignorePatterns: [
        'src/interfaces/**/*',
        'types-and-hooks.tsx',
        'build',
        'src/gql',
        '.eslintrc.js',
    ],
};
