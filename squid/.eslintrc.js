module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    rules: {
        'prettier/prettier': 'error',
    },
    ignorePatterns: [
        'lib/**/*',
        'db/**/*',
        'src/types/**/*',
        'src/model/generated/**/*',
        'prettierrc.js',
    ],
};
