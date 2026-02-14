import { FilterOptionsState, InputAdornment } from '@mui/material';
import React, { SyntheticEvent, useCallback, useMemo, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import AccountDisplay from '../AccountDisplay/AccountDisplay';
import { useAccountNames } from '../../contexts/AccountNamesContext';
import IdenticonBadge from '../IdenticonBadge';
import { AccountBadge } from '../../types';
import { Autocomplete, TextField } from '../library';
import OptionMenuItem from './OptionMenuItem';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';

export interface AccountBaseInfo {
    address: string;
    meta?: {
        isProxy?: boolean;
        isMulti?: boolean;
    };
}

interface Props {
    className?: string;
    accountList?: AccountBaseInfo[];
    onChange: (account: AccountBaseInfo) => void;
    value?: AccountBaseInfo;
    label?: string;
    allowAnyAddressInput?: boolean;
    withBadge?: boolean;
    disabled?: boolean;
    onInputChange?: (
        _: SyntheticEvent<Element, Event>,
        val: NonNullable<
            AccountBaseInfo | string | undefined | (string | AccountBaseInfo | undefined)[]
        >,
    ) => void;
    testId?: string;
}

const getBadge = (account?: AccountBaseInfo | string) => {
    return typeof account === 'string'
        ? undefined
        : account?.meta?.isProxy
          ? AccountBadge.PURE
          : account?.meta?.isMulti
            ? AccountBadge.MULTI
            : undefined;
};

const isOptionEqualToValue = (option: AccountBaseInfo, value: AccountBaseInfo) => {
    return option.address === value.address;
};

const isAccountBaseInfo = (value: any): value is AccountBaseInfo => {
    return value && value.address;
};

const GenericAccountSelection = ({
    className,
    accountList = [],
    value,
    onChange,
    label = '',
    allowAnyAddressInput = false,
    withBadge = false,
    disabled = false,
    onInputChange,
    testId,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { getNamesWithExtension } = useAccountNames();
    const valueAddress = useMemo(
        () => (typeof value === 'string' ? value : value?.address),
        [value],
    );
    const valueBadge = useMemo(
        () => (withBadge ? getBadge(value || '') : undefined),
        [value, withBadge],
    );

    const getOptionLabel = useCallback(
        (option: (typeof accountList)[0] | string) => {
            // this happens when allowAnyAddressInput === true and users enter a string manually
            if (typeof option === 'string') {
                return option;
            }

            if (allowAnyAddressInput) {
                return option.address;
            }

            return getNamesWithExtension(option.address) || option.address;
        },
        [allowAnyAddressInput, getNamesWithExtension],
    );

    const filter = useMemo(
        () =>
            createFilterOptions({
                ignoreCase: true,
                stringify: (option: (typeof accountList)[0]) => {
                    const addressName = `${option.address}${getNamesWithExtension(option.address)}`;
                    return addressName;
                },
            }),
        [getNamesWithExtension],
    );

    const filterOptions = useCallback(
        (
            options: AccountBaseInfo[],
            state: FilterOptionsState<AccountBaseInfo>,
        ): AccountBaseInfo[] => {
            const filtered = filter(options, state);

            const { inputValue } = state;

            // Suggest the creation of a new value
            const isExisting = filtered.length !== 0;
            if (inputValue !== '' && !isExisting) {
                filtered.push({
                    address: inputValue,
                });
            }

            return filtered;
        },
        [filter],
    );

    const onInputBlur = useCallback(() => {
        inputRef.current?.setSelectionRange(0, 0);
    }, []);

    const onChangeAutocomplete = useCallback(
        (
            _: React.SyntheticEvent<Element, Event>,
            val: NonNullable<string | AccountBaseInfo> | (string | AccountBaseInfo)[] | null,
        ) => {
            if (typeof val === 'string') {
                onChange({
                    address: val,
                });
            } else {
                isAccountBaseInfo(val) && onChange(val);
            }
            onInputBlur();
        },
        [onChange, onInputBlur],
    );

    const handleSpecialKeys = useCallback(
        (e: any) => {
            if (['Enter', 'Escape'].includes(e.key)) {
                onInputBlur();
            }
        },
        [onInputBlur],
    );

    const getRenderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: AccountBaseInfo,
    ) => {
        return (
            <OptionMenuItem
                {...props}
                keyValue={option.address}
                key={option.address}
            >
                <AccountDisplay
                    address={option.address}
                    badge={withBadge ? getBadge(option) : undefined}
                />
            </OptionMenuItem>
        );
    };

    const getRenderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            data-cy="input-account-address"
            {...params}
            inputRef={inputRef}
            label={label}
            slotProps={{
                input: {
                    ...params.InputProps,
                    startAdornment: valueAddress && (
                        <InputAdornment position="start">
                            <IdenticonBadge
                                address={valueAddress}
                                badge={valueBadge}
                                sideBadge
                                size="small"
                            />
                        </InputAdornment>
                    ),
                },
            }}
            onBlur={onInputBlur}
            onKeyDown={handleSpecialKeys}
        />
    );

    return (
        <Autocomplete
            data-cy={testId}
            className={className}
            isOptionEqualToValue={isOptionEqualToValue}
            freeSolo={allowAnyAddressInput}
            selectOnFocus={allowAnyAddressInput}
            clearOnBlur={allowAnyAddressInput}
            handleHomeEndKeys={allowAnyAddressInput}
            disableClearable={!allowAnyAddressInput}
            filterOptions={filterOptions}
            options={accountList}
            renderOption={getRenderOption}
            renderInput={getRenderInput}
            getOptionLabel={getOptionLabel}
            onChange={onChangeAutocomplete}
            value={value || ({ address: '' } as AccountBaseInfo)}
            disabled={disabled}
            onInputChange={onInputChange}
        />
    );
};

export default styled(GenericAccountSelection)`
    flex: 1;
`;
