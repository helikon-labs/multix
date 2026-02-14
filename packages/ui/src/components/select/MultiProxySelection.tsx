import { Box, InputAdornment } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import AccountDisplay from '../AccountDisplay/AccountDisplay';
import IdenticonBadge from '../IdenticonBadge';
import { useAccountNames } from '../../contexts/AccountNamesContext';
import { AccountBadge } from '../../types';
import { Autocomplete } from '../library';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import TextFieldLargeStyled from '../library/TextFieldLargeStyled';
import { useGetIdentity } from '../../hooks/useGetIdentity';
import { getIdentityName } from '../../utils/getIdentityName';
import { getDisplayName } from '../../utils/getDisplayName';

interface Props {
    className?: string;
    testId?: string;
}

interface Option {
    address: string;
    isPure: boolean;
    localName: string;
    identityName: string;
}

const emptyOption = { address: '', isPure: false, localName: '', identityName: '' } as Option;

const isOptionEqualToValue = (option?: Option, value?: Option) => {
    if (!option || !value) return false;

    return option.address === value.address;
};

const MultiProxySelection = ({ className, testId = '' }: Props) => {
    const ref = useRef<HTMLInputElement>(null);
    const {
        multiProxyList,
        selectedMultiProxy,
        selectMultiProxy,
        isLoading,
        canFindMultiProxyFromUrl,
    } = useMultiProxy();
    const [options, setOptions] = useState<Option[]>([]);
    const isSelectedProxy = useMemo(() => !!selectedMultiProxy?.proxy, [selectedMultiProxy]);
    const addressToShow = useMemo(
        // We only support one multisigs if they have no proxy
        () => selectedMultiProxy?.proxy || selectedMultiProxy?.multisigs[0].address,
        [selectedMultiProxy],
    );

    const selectedOption = useMemo(() => {
        let res: Option = emptyOption;

        if (!canFindMultiProxyFromUrl) return res;

        if (!selectedMultiProxy) return options[0];

        if (selectedMultiProxy?.proxy) {
            res =
                options.find((option) => option.address === selectedMultiProxy.proxy) ||
                emptyOption;
        } else {
            res =
                options.find(
                    (option) => option.address === selectedMultiProxy?.multisigs[0].address,
                ) || emptyOption;
        }

        return res;
    }, [canFindMultiProxyFromUrl, options, selectedMultiProxy]);
    const { accountNames } = useAccountNames();
    const filterOptions = createFilterOptions({
        ignoreCase: true,
        stringify: (option: Option) => {
            const { localName, identityName, address } = option;
            return `${localName}${identityName}${address}` || '';
        },
    });
    const getIdentity = useGetIdentity();

    useEffect(() => {
        const addressList = multiProxyList.map((mp) => {
            const isPure = !!mp.proxy;

            return {
                isPure,
                address: isPure ? mp.proxy : mp.multisigs[0].address,
            };
        });

        const allIdentityNames = Promise.all(
            addressList.map(({ address }) => {
                return getIdentity(address!);
            }),
        );

        allIdentityNames
            .then((allNames) => {
                const optionList = addressList.map(
                    (info, index) =>
                        ({
                            ...info,
                            localName: accountNames[info.address!],
                            identityName: getIdentityName(allNames[index]).identityName,
                        }) as Option,
                );

                setOptions(optionList);
            })
            .catch(console.error);
    }, [accountNames, getIdentity, multiProxyList]);

    const getOptionLabel = useCallback((option?: NonNullable<Option | string>): string => {
        if (!option) return '';

        if (typeof option === 'string') return option;

        // We only support one multisigs if they have no proxy
        return getDisplayName(option.localName, option.identityName) || option.address;
    }, []);

    const onChange = useCallback(
        (
            _: React.SyntheticEvent<Element, Event>,
            value: NonNullable<string | Option> | (string | Option)[],
        ) => {
            if (!value) return;

            if (Array.isArray(value)) return;

            if (typeof value === 'string') {
                selectMultiProxy(value);
                return;
            }

            selectMultiProxy(value.address);
        },
        [selectMultiProxy],
    );

    const handleSpecialKeys = useCallback((e: React.KeyboardEvent) => {
        if (['Enter', 'Escape'].includes(e.key)) {
            ref?.current?.blur();
        }
    }, []);

    const renderOptions = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: Option,
    ): React.ReactNode => {
        return (
            <Box
                {...props}
                key={option.address}
                component="li"
                data-cy={`select-multiproxy-option-${testId}`}
            >
                <AccountDisplay
                    address={option.address}
                    badge={option.isPure ? AccountBadge.PURE : AccountBadge.MULTI}
                    data-cy={`select-multiproxy-option-details-${testId}`}
                />
            </Box>
        );
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextFieldLargeStyled
            {...params}
            inputRef={ref}
            label=""
            slotProps={{
                input: {
                    ...params.InputProps,
                    startAdornment: addressToShow && (
                        <InputAdornment position="start">
                            <IdenticonBadge
                                address={addressToShow}
                                badge={isSelectedProxy ? AccountBadge.PURE : AccountBadge.MULTI}
                            />
                        </InputAdornment>
                    ),
                },
                htmlInput: {
                    ...params.inputProps,
                    'data-cy': `input-select-multiproxy-${testId}`,
                },
            }}
            onKeyDown={handleSpecialKeys}
        />
    );

    if (isLoading || multiProxyList.length === 0 || !selectedOption) {
        return null;
    }

    return (
        <Autocomplete
            className={className}
            isOptionEqualToValue={isOptionEqualToValue}
            disableClearable
            filterOptions={filterOptions}
            options={options}
            renderOption={renderOptions}
            renderInput={renderInput}
            getOptionLabel={getOptionLabel}
            onChange={onChange}
            value={selectedOption}
            data-cy={`select-multiproxy-${testId}`}
        />
    );
};

export default styled(MultiProxySelection)`
    min-width: 12.5rem;
    text-align: right;
    width: 100%;

    .MuiTextField-root {
        @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
            min-width: 13.6875rem;
        }

        @media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
            min-width: 18.6875rem;
        }
    }

    .MuiAutocomplete-endAdornment {
        right: 1rem !important;
    }

    .MuiAutocomplete-option {
        padding: 0.5rem 0.75rem 0.5rem 1rem;
        flex-shrink: 0;
        border-bottom: 1px solid ${({ theme }) => theme.custom.text.borderColor};

        .MuiBox-root {
            max-width: 12rem;
        }

        &:last-child {
            border-bottom: none;
        }
    }
`;
