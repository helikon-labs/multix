# Suggested Improvements

## Replace `useMemo` with `useEffect` for WebSocket provider creation

**Files:**

- `src/contexts/NativeIdentityApiContext.tsx`
- `src/contexts/PeopleChainApiContext.tsx`

**Rationale:** Both files use `useMemo` to create a WebSocket provider, which is a side effect (network connection). `useMemo` is intended for pure computations — React reserves the right to discard and recompute memoised values, which could unexpectedly recreate the connection. A `useEffect` with a `useState` to hold the provider is semantically correct.

**Tradeoff:** Introduces one extra render cycle when `selectedNetworkInfo` changes — one render without the new provider, then another after the effect runs and sets state. Not a meaningful performance concern here.

**Pattern (same for both files, adjust field names for `PeopleChainApiContext`):**

```tsx
// Replace:
const wsProvider = useMemo(() => {
    if (!selectedNetworkInfo?.rpcUrls) return;

    return getWsProvider(selectedNetworkInfo.rpcUrls, wsStatusChangeCallback);
}, [selectedNetworkInfo]);

// With:
const [wsProvider, setWsProvider] = useState<ReturnType<typeof getWsProvider> | undefined>();

useEffect(() => {
    if (!selectedNetworkInfo?.rpcUrls) return;
    setWsProvider(getWsProvider(selectedNetworkInfo.rpcUrls, wsStatusChangeCallback));
}, [selectedNetworkInfo]);
```

Remove `useMemo` from the import on line 1 of each file once the change is applied.
