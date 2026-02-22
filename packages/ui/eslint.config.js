const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const graphqlEslint = require("@graphql-eslint/eslint-plugin");
const noOnlyTests = require("eslint-plugin-no-only-tests");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            tsconfigRootDir: __dirname,
            project: "./tsconfig.json",
        },
    },

    extends: [
        js.configs.recommended,
        require("eslint-config-prettier"),
        ...fixupConfigRules(compat.extends(
            "plugin:react-hooks/recommended",
            "plugin:react/recommended",
            "plugin:@typescript-eslint/eslint-recommended",
        )),
    ],
    plugins: {
        react: fixupPluginRules(react),
        prettier,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "no-only-tests": noOnlyTests,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "no-only-tests/no-only-tests": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "react/jsx-max-props-per-line": ["error", {
            maximum: {
                single: 1,
                multi: 1,
            },
        }],
        "object-curly-spacing": ["error", "always"],
        "react/jsx-tag-spacing": "error",
        "prettier/prettier": "error",
        "react-hooks/exhaustive-deps": "error",
        "react/react-in-jsx-scope": "off",
    },
}, {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
        "@graphql-eslint": fixupPluginRules(graphqlEslint),
    },
    processor: "@graphql-eslint/graphql",
}, {
    files: ["**/*.graphql"],
    languageOptions: {
        parser: graphqlEslint,
    },
    extends: [
        graphqlEslint.configs["flat/schema-recommended"],
        graphqlEslint.configs["flat/operations-recommended"],
    ],
    plugins: {
        "@graphql-eslint": fixupPluginRules(graphqlEslint),
    },
    rules: {
        "@graphql-eslint/known-type-names": "error",
        "@graphql-eslint/require-selections": "error",
    },
}, globalIgnores([
    "eslint.config.js",
    ".papi/",
    "**/types-and-hooks.tsx",
    "**/build",
    "src/gql",
])]);
