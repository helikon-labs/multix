import { styled } from '@mui/material/styles';
import { Grid2, IconButton, InputAdornment, SelectChangeEvent } from '@mui/material';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import GenericAccountSelection, { AccountBaseInfo } from './select/GenericAccountSelection';
import { useAccountBaseFromAccountList } from '../hooks/useAccountBaseFromAccountList';
import { isContextIn, isContextOf, useApi } from '../contexts/ApiContext';
import { assetHubKeys, noHydrationKeys } from '../types';
import { Asset } from '../contexts/AssetsContext';
import { getGlobalMaxValue, inputToBigInt } from '../utils/bnUtils';
import { MultiAddress } from '@polkadot-api/descriptors';
import { Select, TextField } from './library';
import { HiOutlineTrash } from 'react-icons/hi2';
import { FieldInfo } from './EasySetup/BalancesTransfer';
import { debounce } from '../utils/debounce';

export interface Option extends Omit<Asset, 'name'> {
    id?: number;
}

interface Props {
    className?: string;
    index: number;
    onSetErrorMessage: React.Dispatch<React.SetStateAction<string | ReactNode>>;
    onSetExtrinsic: (params: FieldInfo) => void;
    onRemoveItem: (index: number) => void;
    defaultAssetId?: number;
    setLastAssetId: (id?: number) => void;
    withDeleteButton: boolean;
    assetList?: Option[];
}

const TransferAsset = ({
    className,
    onSetErrorMessage,
    onSetExtrinsic,
    index,
    onRemoveItem,
    defaultAssetId,
    setLastAssetId,
    withDeleteButton,
    assetList,
}: Props) => {
    const accountBase = useAccountBaseFromAccountList({ withAccountsFromAddressBook: true });
    const ctx = useApi();
    const { api, chainInfo, apiDescriptor } = ctx;
    const isAssetHub = useMemo(() => isContextIn(ctx, assetHubKeys), [ctx]);
    const [amountString, setAmountString] = useState('');
    const [amount, setAmount] = useState<bigint | undefined>();
    const [amountError, setAmountError] = useState('');
    const [selected, setSelected] = useState<AccountBaseInfo | undefined>();
    const maxValue = useMemo(() => getGlobalMaxValue(128), []);
    const toAddress = useMemo(() => selected?.address || '', [selected?.address]);
    const [selectedAsset, setSelectedAsset] = useState<Option | undefined>();

    const isNativeAssetSelected = useMemo(() => {
        if (!selectedAsset || selectedAsset.id === undefined) return true;

        return selectedAsset.symbol === chainInfo?.tokenSymbol;
    }, [chainInfo?.tokenSymbol, selectedAsset]);

    useEffect(() => {
        if (!selectedAsset && !!assetList) {
            setSelectedAsset(assetList.find(({ id }) => id === defaultAssetId) || assetList[0]);
        }
    }, [assetList, defaultAssetId, selectedAsset]);

    const onAddressDestChange = useCallback((account: AccountBaseInfo) => {
        setSelected(account);
    }, []);

    const debounceSetAmount = useMemo(() => debounce(setAmount, 200), [setAmount]);

    useEffect(() => {
        if (!selectedAsset || !amountString) return;

        if (!amountString.match('^[0-9]+([.][0-9]+)?$')) {
            setAmountError('Only numbers and "." are accepted.');
            onSetErrorMessage('Invalid amount');
            setAmount(0n);
            return;
        }

        const bigintResult = inputToBigInt(selectedAsset.decimals, amountString);

        if (bigintResult > maxValue) {
            setAmountError('Amount too large');
            onSetErrorMessage('Amount too large');
            return;
        }

        debounceSetAmount(bigintResult);
    }, [amountString, maxValue, onSetErrorMessage, selectedAsset, debounceSetAmount]);

    const onAmountChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setAmountError('');
            onSetErrorMessage('');

            const stringInput = event.target.value.trim();
            setAmountString(stringInput);
        },
        [onSetErrorMessage],
    );

    const onAssetSelection = useCallback(
        (event: SelectChangeEvent<unknown>) => {
            const selectedSymbol = event.target.value as string;

            if (!assetList) return;

            const selected = assetList.find(({ symbol }) => selectedSymbol === symbol);

            if (!selected) return;

            setSelectedAsset(selected);
            setLastAssetId(selected.id);
        },
        [assetList, setLastAssetId],
    );

    useEffect(() => {
        if (!ctx?.api || !toAddress || !amount || !selectedAsset) {
            onSetExtrinsic({ extrinsic: undefined, index, assetId: undefined, amount: undefined });
            return;
        }

        // not re-using isAssetHub here bc TS doesn't type correctly
        // if we're on AH and *not* sending the native asset use Assets.transfer_keep_alive
        if (isContextIn(ctx, assetHubKeys) && !isNativeAssetSelected && !!selectedAsset.id) {
            const extrinsic = ctx.api.tx.Assets.transfer_keep_alive({
                amount,
                id: selectedAsset.id,
                target: MultiAddress.Id(toAddress),
            });

            !!extrinsic && onSetExtrinsic({ extrinsic, index, assetId: selectedAsset.id, amount });

            // we're sending the native asset (on any network including AH) use Balances.transfer
        } else {
            const extrinsic = isContextOf(ctx, 'hydration')
                ? ctx.api.tx.Balances.transfer_keep_alive({
                      dest: toAddress,
                      value: amount,
                  })
                : isContextIn(ctx, noHydrationKeys) &&
                  ctx.api.tx.Balances.transfer_keep_alive({
                      dest: MultiAddress.Id(toAddress),
                      value: amount,
                  });

            !!extrinsic && onSetExtrinsic({ extrinsic, index, assetId: undefined, amount });
        }
    }, [
        amount,
        api,
        apiDescriptor,
        chainInfo,
        ctx,
        index,
        isNativeAssetSelected,
        onSetExtrinsic,
        selectedAsset,
        toAddress,
    ]);

    const onRemove = useCallback(() => {
        onRemoveItem(index);
    }, [index, onRemoveItem]);

    const TokenSelection = useCallback(() => {
        if (!selectedAsset) return;

        return (
            <SelectStyled
                value={selectedAsset.symbol}
                onChange={onAssetSelection}
                menuItems={(assetList || []).map(({ logo, symbol }) => ({ value: symbol, logo }))}
                testId="ah-assets"
            />
        );
    }, [assetList, onAssetSelection, selectedAsset]);

    return (
        <Grid2
            className={className}
            container
            spacing={2}
            justifyContent={'center'}
            data-cy={`transfer-asset-${index}`}
        >
            <Grid2 size={{ xs: 12, md: 7 }}>
                <GenericAccountSelection
                    className="to"
                    onChange={onAddressDestChange}
                    value={selected}
                    label="To"
                    allowAnyAddressInput={true}
                    accountList={accountBase}
                    testId="send-tokens-field-to"
                />
            </Grid2>
            <Grid2
                container
                size={{ xs: 12, md: 5 }}
                spacing={0}
            >
                <Grid2 size={{ xs: 11 }}>
                    <TextFieldStyled
                        fullWidth
                        className={isAssetHub ? 'assetHub' : ''}
                        data-cy="send-tokens-field-amount"
                        label={`Amount`}
                        onChange={onAmountChange}
                        value={amountString}
                        helperText={amountError}
                        error={!!amountError}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isAssetHub ? (
                                            <TokenSelection />
                                        ) : (
                                            chainInfo?.tokenSymbol || ''
                                        )}
                                    </InputAdornment>
                                ),
                            },
                            htmlInput: {
                                'data-cy': 'input-send-tokens-amount',
                            },
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 1 }}>
                    {withDeleteButton && (
                        <DeleteButtonStyled
                            onClick={onRemove}
                            data-cy="delete-field-button"
                        >
                            <HiOutlineTrash />
                        </DeleteButtonStyled>
                    )}
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

const SelectStyled = styled(Select)`
    outline: none !important;
    .MuiSelect-select {
        margin-right: -1rem;
        padding-right: 2rem !important;
    }
`;

const TextFieldStyled = styled(TextField)`
    &.assetHub > .MuiOutlinedInput-root {
        padding-right: 0;
    }
`;
export const DeleteButtonStyled = styled(IconButton)`
    margin: 1.9rem 0.5rem 0 0.5rem;
    height: 2.5rem;
`;
export default styled(TransferAsset)`
    margin-top: 0.5rem;
`;
