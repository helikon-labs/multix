import { useCallback, useEffect, useState } from 'react';
import { useWatchedAccounts } from '../contexts/WatchedAccountsContext';
import { HiddenAccount, useHiddenAccounts } from '../contexts/HiddenAccountsContext';
import { AccountNames, useAccountNames } from '../contexts/AccountNamesContext';

export interface MigratedData {
    watchedPubKeys?: string[];
    hiddenAccounts?: HiddenAccount[];
    pubKeyNames?: AccountNames;
}

interface ObjectToEncode {
    w?: string[];
    h?: HiddenAccount[];
    n?: AccountNames;
}

const encodeData = ({ watchedPubKeys, hiddenAccounts, pubKeyNames }: MigratedData) => {
    const obj: ObjectToEncode = {};

    if (watchedPubKeys && watchedPubKeys.length > 0) {
        obj.w = watchedPubKeys;
    }

    if (hiddenAccounts && hiddenAccounts.length > 0) {
        obj.h = hiddenAccounts;
    }

    if (pubKeyNames && Object.entries(pubKeyNames).length > 0) {
        obj.n = pubKeyNames;
    }

    const stringData = JSON.stringify(obj);
    const base64Data = btoa(stringData);
    const urlSafeData = encodeURIComponent(base64Data);

    return urlSafeData;
};

const decodeData = (encodedData: string): MigratedData => {
    if (!encodedData) return { watchedPubKeys: [], hiddenAccounts: [], pubKeyNames: {} };
    const decodedData = decodeURIComponent(encodedData);
    const stringData = atob(decodedData);
    const obj = JSON.parse(stringData) as ObjectToEncode;

    return {
        watchedPubKeys: obj.w,
        hiddenAccounts: obj.h,
        pubKeyNames: obj.n,
    };
};

export const useImportExportLocalData = () => {
    const [encodedData, setEncodedData] = useState<string | null>(null);
    const { watchedPubKeys, setWatchedPubKeys } = useWatchedAccounts();
    const { hiddenAccounts, setHiddenAccounts } = useHiddenAccounts();
    const { pubKeyNames, setPubKeyNames } = useAccountNames();

    useEffect(() => {
        setEncodedData(encodeData({ watchedPubKeys, hiddenAccounts, pubKeyNames }));
    }, [watchedPubKeys, hiddenAccounts, pubKeyNames]);

    const mergeWithLocalData = useCallback(
        (newData: MigratedData) => {
            if (newData.watchedPubKeys && newData.watchedPubKeys.length > 0) {
                const newWatchedPubKeys = new Set(watchedPubKeys || []);
                newData.watchedPubKeys.forEach((pubKey) => {
                    newWatchedPubKeys.add(pubKey);
                });
                setWatchedPubKeys(Array.from(newWatchedPubKeys));
            }

            if (newData.hiddenAccounts && newData.hiddenAccounts.length > 0) {
                const newHiddenAccounts = [...hiddenAccounts];

                newData.hiddenAccounts.forEach((account) => {
                    const alreadyExists = hiddenAccounts.find(
                        ({ network, pubKey }) =>
                            account.network === network && account.pubKey === pubKey,
                    );
                    !alreadyExists && newHiddenAccounts.push(account);
                });

                setHiddenAccounts(newHiddenAccounts);
            }

            if (newData.pubKeyNames && Object.entries(newData.pubKeyNames).length > 0) {
                const newPubKeyNames = { ...pubKeyNames, ...newData.pubKeyNames };
                setPubKeyNames(newPubKeyNames);
            }
        },
        [
            hiddenAccounts,
            pubKeyNames,
            setHiddenAccounts,
            setPubKeyNames,
            setWatchedPubKeys,
            watchedPubKeys,
        ],
    );

    return { encodedData, mergeWithLocalData, decodeData };
};
