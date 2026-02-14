import { styled } from '@mui/material/styles';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { isContextIn, useApi } from '../../contexts/ApiContext';
import { Transaction } from 'polkadot-api';
import TransferAsset, { Option } from '../TransferAsset';
import { Button } from '../library';
import { Grid2 } from '@mui/material';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { useNetwork } from '../../contexts/NetworkContext';
import { useAssets } from '../../contexts/AssetsContext';
import { assetHubKeys } from '../../types';
import { AH_SUPPORTED_ASSETS } from '../../constants';
import { useCheckTransferableBalance } from '../../hooks/useCheckTransferableBalance';
import { getErrorMessageReservedFunds } from '../../utils/getErrorMessageReservedFunds';
import { useGetAssetBalances } from '../../hooks/useGetAssetBalances';
import { formatBigIntBalance } from '../../utils/formatBnBalance';

interface Props {
    className?: string;
    from: string;
    onSetExtrinsic: (ext?: Transaction<any, any, any, any>) => void;
    onSetErrorMessage: React.Dispatch<React.SetStateAction<string | ReactNode>>;
}

export interface FieldInfo {
    extrinsic?: Transaction<any, any, any, any> | undefined;
    index: number;
    assetId?: number;
    amount?: bigint;
}

const nonNativeAssetIds = AH_SUPPORTED_ASSETS.map(({ assetId }) => assetId);

export const BalancesTransfer = ({ className, onSetExtrinsic, onSetErrorMessage, from }: Props) => {
    const [lastIndex, setLastIndex] = useState(0);
    const ctx = useApi();
    const [lastAssetId, setLastAssetId] = useState<number | undefined>();
    const { api, chainInfo } = ctx;
    const { selectedNetworkInfo } = useNetwork();
    const isAssetHub = useMemo(() => isContextIn(ctx, assetHubKeys), [ctx]);
    const { getAssetMetadata } = useAssets();
    const [fieldInfoMap, setFieldInfoMap] = useState<
        Map<number, Omit<FieldInfo, 'index'> | undefined>
    >(new Map([[0, undefined]]));
    const { balances } = useGetAssetBalances({
        address: from,
        assetIds: nonNativeAssetIds,
    });
    const totalPerAsset = useMemo(() => {
        const res: Record<number, bigint> = {};
        Array.from(fieldInfoMap.values()).forEach((fieldInfo) => {
            if (!fieldInfo) return;
            const id = fieldInfo.assetId ?? 0;
            res[id] = (res[id] ?? 0n) + (fieldInfo.amount ?? 0n);
        });
        return res;
    }, [fieldInfoMap]);
    // the assets can be sufficient here so no need to check for the ED
    const { hasEnoughFreeBalance: hasEnoughNativeToken } = useCheckTransferableBalance({
        min: totalPerAsset[0],
        address: from,
        withPplApi: false,
    });

    const assetList = useMemo(() => {
        if (!chainInfo || !selectedNetworkInfo) return [] as Option[];

        const assetHubList = AH_SUPPORTED_ASSETS.map(({ assetId }) => {
            if (!isAssetHub) return;

            const asset = getAssetMetadata(assetId);

            if (!asset) return;

            return {
                id: assetId,
                ...asset,
            };
        }).filter(Boolean) as Option[];

        const nativeAssetEntry = {
            id: 0,
            logo: selectedNetworkInfo.nativeAssetLogo || selectedNetworkInfo.networkLogo,
            symbol: chainInfo.tokenSymbol,
            decimals: chainInfo.tokenDecimals,
        } as Option;

        return [nativeAssetEntry, ...assetHubList];
    }, [chainInfo, getAssetMetadata, isAssetHub, selectedNetworkInfo]);

    // check for the native asset
    useEffect(() => {
        if (!!totalPerAsset[0] && !hasEnoughNativeToken) {
            const message = getErrorMessageReservedFunds({
                identifier: '"From" address',
                requiredBalanceString: formatBigIntBalance(
                    totalPerAsset[0],
                    chainInfo?.tokenDecimals,
                    {
                        tokenSymbol: chainInfo?.tokenSymbol,
                    },
                ),
            });
            onSetErrorMessage(message);
        }
    }, [chainInfo, hasEnoughNativeToken, onSetErrorMessage, totalPerAsset]);

    // check for other assets
    useEffect(() => {
        const assetIssue = Object.entries(totalPerAsset).find(([assetId, amount]) => {
            return balances && balances[Number(assetId)] < amount;
        });

        const asset = assetList.find((asset) => asset.id === Number(assetIssue?.[0]));

        if (assetIssue) {
            const message = getErrorMessageReservedFunds({
                identifier: '"From" address',
                requiredBalanceString: formatBigIntBalance(assetIssue[1], asset?.decimals, {
                    tokenSymbol: asset?.symbol,
                }),
            });
            onSetErrorMessage(message);
        }
    }, [assetList, balances, chainInfo, hasEnoughNativeToken, onSetErrorMessage, totalPerAsset]);

    useEffect(() => {
        if (!api) return;

        const extrinsicsArray = Array.from(fieldInfoMap.values())
            .map((fieldInfo) => fieldInfo?.extrinsic)
            .filter(Boolean) as Transaction<any, any, any, any>[];

        if (extrinsicsArray.length === 0) {
            onSetExtrinsic(undefined);
            return;
        }

        if (extrinsicsArray.length === 1) {
            onSetExtrinsic(extrinsicsArray[0]);
        } else {
            onSetExtrinsic(
                api.tx.Utility.batch_all({
                    calls: extrinsicsArray.map((extrinsic) => extrinsic.decodedCall),
                }),
            );
        }
    }, [api, fieldInfoMap, onSetExtrinsic]);

    const onAddExtrinsic = useCallback(
        ({ extrinsic, index, amount, assetId }: FieldInfo) => {
            onSetErrorMessage('');
            setFieldInfoMap((prevExtrinsics) => {
                const newMap = new Map(prevExtrinsics);
                newMap.set(index, { extrinsic, amount, assetId });
                return newMap;
            });
        },
        [onSetErrorMessage],
    );

    const onAddAField = useCallback(() => {
        onSetErrorMessage('');
        setFieldInfoMap((prevExtrinsics) => {
            const newMap = new Map(prevExtrinsics);
            const newIndex = lastIndex + 1;
            newMap.set(newIndex, undefined);
            setLastIndex(newIndex);
            return newMap;
        });
    }, [lastIndex, onSetErrorMessage]);

    const onRemoveItem = useCallback(
        (index: number) => {
            onSetErrorMessage('');
            setFieldInfoMap((prevFieldInfo) => {
                const newMap = new Map(prevFieldInfo);
                newMap.delete(index);
                return newMap;
            });
        },
        [onSetErrorMessage],
    );

    return (
        <>
            {Array.from(fieldInfoMap.keys()).map((index) => (
                <TransferAsset
                    key={index}
                    index={index}
                    className={className}
                    onSetErrorMessage={onSetErrorMessage}
                    onSetExtrinsic={onAddExtrinsic}
                    onRemoveItem={onRemoveItem}
                    defaultAssetId={lastAssetId}
                    setLastAssetId={setLastAssetId}
                    withDeleteButton={fieldInfoMap.size > 1}
                    assetList={assetList}
                />
            ))}
            <ButtonGridStyled>
                <AddButtonStyled
                    onClick={onAddAField}
                    variant="tertiary"
                    data-cy="add-recipient-button"
                >
                    <HiOutlinePlusCircle size={24} /> Add recipient
                </AddButtonStyled>
            </ButtonGridStyled>
        </>
    );
};

export default styled(BalancesTransfer)``;

const AddButtonStyled = styled(Button)`
    & > svg {
        margin-right: 0.5rem;
    }
`;
const ButtonGridStyled = styled(Grid2)`
    margin-top: 1rem;
`;
