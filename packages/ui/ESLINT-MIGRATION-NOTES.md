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

## Fixed

| Rule                                      | File                                                     | Fix                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-hooks/static-components`           | `src/components/IdenticonBadge.tsx`                      | Removed `AccountIcon`; inlined `MultixIdenticon` directly with a shared `iconSize` variable                                                                                                                                                                                                                                                                                                     |
| `react-hooks/static-components`           | `src/components/Transactions/TransactionList.tsx`        | Extracted `Transactions` to module level; hooks called directly inside it                                                                                                                                                                                                                                                                                                                       |
| `react-hooks/preserve-manual-memoization` | `src/contexts/NativeIdentityApiContext.tsx`              | Changed dep from `selectedNetworkInfo?.rpcUrls` to `selectedNetworkInfo`                                                                                                                                                                                                                                                                                                                        |
| `react-hooks/preserve-manual-memoization` | `src/contexts/PeopleChainApiContext.tsx`                 | Changed dep from `selectedNetworkInfo?.pplChainRpcUrls` to `selectedNetworkInfo`                                                                                                                                                                                                                                                                                                                |
| `react-hooks/immutability`                | `src/contexts/NetworkContext.tsx`                        | Eliminated recursive `selectNetwork` self-call; resolved `validNetwork` inline                                                                                                                                                                                                                                                                                                                  |
| `react-hooks/set-state-in-effect`         | `src/contexts/ApiContext.tsx`                            | `client` and `api` → `useMemo`; `apiDescriptor` → plain derived variable; `resetApi` simplified to reset only `chainInfo` and `compatibilityToken`; initialization `useEffect` removed                                                                                                                                                                                                          |
| `react-hooks/set-state-in-effect`         | `src/contexts/AccountsContext.tsx`                       | `isAllowedToConnectToExtension` → lazy `useState` from localStorage; `selectedAccount` → `useMemo` over `selectedAddress` (lazy `useState` from localStorage); initialization `useEffect` removed                                                                                                                                                                                               |
| `react-hooks/set-state-in-effect`         | `src/contexts/HiddenAccountsContext.tsx`                 | `hiddenAccounts` → lazy `useState` from localStorage; `isInitialized` removed entirely (always ready); unnecessary `chainInfo` guard and `loadHiddenAccounts` callback eliminated; initialization `useEffect` deleted                                                                                                                                                                           |
| `react-hooks/set-state-in-effect`         | `src/components/modals/WalletConnectSessionProposal.tsx` | `errorMessage` → plain derived variable from `walletKit`, `sessionProposal`, `chains`, `currentNamespace`; `useState` + `useEffect` removed                                                                                                                                                                                                                                                     |
| `react-hooks/set-state-in-effect`         | `src/hooks/useIdentityApi.tsx`                           | All four derived state variables → plain values inlined directly into return; hook reduced to pure computation; all `useState` + `useEffect` removed                                                                                                                                                                                                                                            |
| `react-hooks/set-state-in-effect`         | `src/pages/Home/Home.tsx`                                | `showNewMultisigAlert` → plain `const` from `searchParams`; `useState` removed; `useEffect` simplified to only call `setSearchParams` (prop, not local state) via `setTimeout`                                                                                                                                                                                                                  |
| `react-hooks/set-state-in-effect`         | `src/pages/Overview/OverviewHeaderView.tsx`              | `nodes` and `edges` → `useMemo`; passed as `defaultNodes`/`defaultEdges` to ReactFlow; `key` prop derived from `selectedMultiProxy` forces remount on proxy change; interactivity preserved via ReactFlow's uncontrolled mode                                                                                                                                                                   |
| `react-hooks/set-state-in-effect`         | `src/components/select/AccountSelection.tsx`             | `name` → `useMemo` combining `userNameEntry` state (tracks active user input by address) with `accountNames` fallback; `useEffect` removed                                                                                                                                                                                                                                                      |
| `react-hooks/set-state-in-effect`         | `src/pages/Settings/Settings.tsx`                        | `expanded` → lazy `useState` initializer deriving initial panel from URL hash; `useEffect` (which called `onToggle` → `setExpanded`) and `useLocation` removed                                                                                                                                                                                                                                  |
| `react-hooks/set-state-in-effect`         | `src/contexts/AccountNamesContext.tsx`                   | `accountNames` → `useMemo` over `pubKeyNames` + `chainInfo`; `pubKeyNames` → lazy `useState` initializer reading from localStorage; init `useEffect` removed; save `useEffect` retained (legitimate side effect)                                                                                                                                                                                |
| `react-hooks/set-state-in-effect`         | `src/hooks/useImportExportLocalData.tsx`                 | `encodedData` → `useMemo` over `watchedPubKeys`, `hiddenAccounts`, `pubKeyNames`; `useState` + `useEffect` removed                                                                                                                                                                                                                                                                              |
| `react-hooks/set-state-in-effect`         | `src/components/MultisigCompactDisplay.tsx`              | `signatories`, `threshold`, `badge` → single `useMemo` over GraphQL `data`; three `useState` + `useEffect` removed                                                                                                                                                                                                                                                                              |
| `react-hooks/set-state-in-effect`         | `src/components/modals/Send.tsx`                         | `errorMessage` → `useMemo` computing balance/funds error, falling back to `signErrorMessage` (new `useState` for action-triggered validation errors); `useEffect` removed                                                                                                                                                                                                                       |
| `react-hooks/set-state-in-effect`         | `src/components/modals/WalletConnectSigning.tsx`         | `errorMessage` → `useMemo` with priority order: namespace mismatch → wrong multiproxy → insufficient balance → `signErrorMessage` (new `useState` for action-triggered validation errors); three `useEffect`s removed; `selectedMultisig` → `useMemo` over `selectedMultisigOverride` (`useState<MultisigAggregated>`) ?? `selectedMultiProxy?.multisigs[0]`; fallback-init `useEffect` removed |
| `react-hooks/set-state-in-effect`         | `src/pages/Creation/ThresholdSelection.tsx`              | `error` → `useMemo` over `threshold` + `signatoriesNumber`; `useState` + `useEffect` removed; `validateThreshold` retains `setThreshold(undefined)` side effect for `handleChange`                                                                                                                                                                                                              |

---

## Remaining: `react-hooks/set-state-in-effect`

The rule flags `setState` calls (direct or indirect) inside `useEffect` bodies. Not all cases are the same — they fall into three categories.

### A. Synchronous derived state → replace `useEffect` + `setState` with `useMemo`

State is computed synchronously from other state or props. The effect and its state variable can be eliminated entirely.

| File                                 | Lines    | Notes |
| ------------------------------------ | -------- | ----- |
| `src/contexts/MultiProxyContext.tsx` | 160, 322 |       |

### B. Async or genuine side effects → `useMemo` not applicable; consider `eslint-disable`

State is set from async operations or external API initialisation. The `useEffect` + `setState` pattern is correct here — the rule is a false positive. Use `// eslint-disable-next-line react-hooks/set-state-in-effect` with a comment explaining why.

| File                                        | Lines | Notes                                                                                           |
| ------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------- |
| `src/components/EasySetup/FromCallData.tsx` | 69    | `setCallDataToUse` called via async `.then()` on `removeProxyProxyCall`                         |
| `src/hooks/useCallInfoFromCallData.tsx`     | 21    | Sync reset guard (`setCallInfo(undefined)`) before async API call — both are in the same effect |
| `src/contexts/NativeIdentityApiContext.tsx` | 89    | Multiple setters initialising API client from external lib — genuine side effect, not derivable |
| `src/contexts/PeopleChainApiContext.tsx`    | 67    | Same pattern as `NativeIdentityApiContext` — API client initialisation                          |
| `src/contexts/PendingTxContext.tsx`         | 447   | `refresh()` triggers async data fetching — not derived state                                    |
| `src/contexts/WatchedAccountsContext.tsx`   | 70    | `loadWatchedPubKeys()` — one-time initialisation on mount                                       |

### C. Indirect setState via function call → restructure or `eslint-disable`

The rule traces through function calls and flags effects that call functions which internally call `setState`. Previously undetected because the `react-hooks/immutability` error in the same file masked it.

| File                              | Line | Notes                                                                                                                                                                                                                                                           |
| --------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/contexts/NetworkContext.tsx` | 53   | `selectNetwork(networkParam)` called in effect — rule detects that `selectNetwork` calls setters internally. This is a one-time initialisation effect; consider running the initial network resolution outside the effect or suppressing with `eslint-disable`. |
