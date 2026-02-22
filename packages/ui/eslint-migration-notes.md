# ESLint Migration Notes

## What Was Done

Migrated `packages/ui` ESLint config from legacy `.eslintrc.js` (eslintrc format) to `eslint.config.mjs` (ESLint 9+ flat config format).

### Key decisions made during migration

- Dropped `FlatCompat` — all used plugins have native flat config support (or are handled via `fixupConfigRules`)
- `eslint:recommended` → `eslintJS.configs.recommended` (native)
- `eslint-config-prettier` → imported directly as `eslintConfigPrettier` (native flat config in v10)
- `@typescript-eslint/eslint-recommended` → `typescriptEslint.configs['flat/eslint-recommended']` (native)
- `eslint-plugin-react` → wrapped with `fixupConfigRules` because its rules still use deprecated `context.getFilename()` API internally (even in its flat config export)
- `eslint-plugin-react-hooks` → manually constructed flat config object because `recommended-latest` exports `plugins` as an array of strings (legacy format), which neither ESLint 10 nor `fixupConfigRules` accepts:
    ```js
    {
        plugins: { 'react-hooks': reactHooks },
        rules: reactHooks.configs['recommended-latest'].rules,
    }
    ```
- `@graphql-eslint/eslint-plugin` → imported as `import * as graphqlEslint` (namespace); plugin registered as `graphqlEslint.default`, parser as `graphqlEslint.parser`, processor as `graphqlEslint.processors.graphql`

### Current `eslint.config.mjs` (working state)

```js
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
            globals: { ...globals.browser },
            parser: tsParser,
            ecmaVersion: 12,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
                tsconfigRootDir: __dirname,
                project: './tsconfig.json',
            },
        },
        extends: [
            eslintJS.configs.recommended,
            eslintConfigPrettier,
            {
                plugins: { 'react-hooks': reactHooks },
                rules: reactHooks.configs['recommended-latest'].rules,
            },
            ...fixupConfigRules([react.configs.flat['recommended']]),
            typescriptEslint.configs['flat/eslint-recommended'],
        ],
        plugins: {
            prettier,
            '@typescript-eslint': typescriptEslint,
            'no-only-tests': noOnlyTests,
            '@graphql-eslint': graphqlEslint.default,
        },
        processor: graphqlEslint.processors.graphql,
        settings: { react: { version: 'detect' } },
        rules: {
            'no-only-tests/no-only-tests': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'react/jsx-max-props-per-line': ['error', { maximum: { single: 1, multi: 1 } }],
            'object-curly-spacing': ['error', 'always'],
            'react/jsx-tag-spacing': 'error',
            'prettier/prettier': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        files: ['**/*.graphql'],
        languageOptions: { parser: graphqlEslint.parser },
        extends: [
            graphqlEslint.configs['flat/schema-recommended'],
            graphqlEslint.configs['flat/operations-recommended'],
        ],
        plugins: { '@graphql-eslint': graphqlEslint.default },
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
```

---

## Pending: Lint Errors from `eslint-plugin-react-hooks` v5 → v7 Upgrade

v7 introduced new rules (part of the React Compiler ruleset) that flag patterns previously allowed.

### 1. `react-hooks/static-components` — **High priority (actual bugs)**

Defining a component inside another component causes React to unmount/remount it on every render, losing internal state.

| File                                              | Line | Issue                                                                    |
| ------------------------------------------------- | ---- | ------------------------------------------------------------------------ |
| `src/components/IdenticonBadge.tsx`               | 27   | `const AccountIcon = () => (...)` defined inside component body          |
| `src/components/Transactions/TransactionList.tsx` | 34   | `const Transactions = useCallback(...)` — component inside `useCallback` |

**Fix:** Extract these to module-level component declarations.

---

### 2. `react-hooks/set-state-in-effect` — **Medium priority (performance / outdated pattern)**

Calling `setState` synchronously in a `useEffect` body causes cascading renders. These work correctly but are inefficient. The recommended approach is to use `useMemo` for derived state instead.

| File                                                     | Lines             |
| -------------------------------------------------------- | ----------------- |
| `src/components/EasySetup/FromCallData.tsx`              | 69                |
| `src/components/MultisigCompactDisplay.tsx`              | 37                |
| `src/components/modals/Send.tsx`                         | 157               |
| `src/components/modals/WalletConnectSessionProposal.tsx` | 55                |
| `src/components/modals/WalletConnectSigning.tsx`         | 93, 108, 142, 152 |
| `src/components/select/AccountSelection.tsx`             | 65                |
| `src/contexts/AccountNamesContext.tsx`                   | 61, 103           |
| `src/contexts/AccountsContext.tsx`                       | 84                |
| `src/contexts/ApiContext.tsx`                            | 74                |
| `src/contexts/HiddenAccountsContext.tsx`                 | 122               |
| `src/contexts/MultiProxyContext.tsx`                     | 160, 322          |
| `src/contexts/NativeIdentityApiContext.tsx`              | 89                |
| `src/contexts/PendingTxContext.tsx`                      | 447               |
| `src/contexts/PeopleChainApiContext.tsx`                 | 67                |
| `src/contexts/WatchedAccountsContext.tsx`                | 70                |
| `src/hooks/useCallInfoFromCallData.tsx`                  | 21                |
| `src/hooks/useIdentityApi.tsx`                           | 30                |
| `src/hooks/useImportExportLocalData.tsx`                 | 60                |
| `src/pages/Creation/ThresholdSelection.tsx`              | 40                |
| `src/pages/Home/Home.tsx`                                | 38                |
| `src/pages/Overview/OverviewHeaderView.tsx`              | 154               |
| `src/pages/Settings/Settings.tsx`                        | 44                |

---

### 3. `react-hooks/preserve-manual-memoization` — **Low priority (React Compiler hint)**

React Compiler skipped optimization due to inconsistent optional chaining in `useMemo` dep arrays vs. usage in the body.

| File                                        | Line | Issue                                                                                            |
| ------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------ |
| `src/contexts/NativeIdentityApiContext.tsx` | 70   | `[selectedNetworkInfo?.rpcUrls]` dep but body uses `selectedNetworkInfo.rpcUrls`                 |
| `src/contexts/PeopleChainApiContext.tsx`    | 51   | `[selectedNetworkInfo?.pplChainRpcUrls]` dep but body uses `selectedNetworkInfo.pplChainRpcUrls` |

**Fix:** Make dep array and body consistent — either both use `?.` or neither.

---

### 4. `react-hooks/immutability` — **Medium priority**

| File                              | Line | Issue                                                                                       |
| --------------------------------- | ---- | ------------------------------------------------------------------------------------------- |
| `src/contexts/NetworkContext.tsx` | 31   | `selectNetwork` is called before its declaration (forward reference within a `useCallback`) |

**Fix:** Restructure so `selectNetwork` is declared before the `useEffect` that calls it.
