import {
    AutocompleteFreeSoloValueMapping,
    Autocomplete as AutocompleteMui,
    Box,
    FilterOptionsState,
    Popper,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import {
    AutocompleteInputChangeReason,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
    AutocompleteValue,
} from '@mui/material/Autocomplete/Autocomplete';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { theme } from '../../styles/theme';

interface AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
    InputProps?: Partial<AutocompleteRenderInputParams['InputProps']>;
    className?: string;
    isOptionEqualToValue?: (option: T, value: T) => boolean;
    filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
    options: ReadonlyArray<T>;
    getOptionLabel?: (option: T | AutocompleteFreeSoloValueMapping<FreeSolo>) => string;
    onChange?: (
        event: React.SyntheticEvent,
        value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    ) => void;
    value?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
    renderOption?: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: T,
        state: AutocompleteRenderOptionState,
    ) => React.ReactNode;
    renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
    disableClearable?: DisableClearable;
    onKeyDown?: (e: React.SyntheticEvent) => void;
    onInputChange?: (
        event: React.SyntheticEvent,
        value: string,
        reason: AutocompleteInputChangeReason,
    ) => void;
    disabled?: boolean;
    freeSolo?: FreeSolo;
    selectOnFocus?: boolean;
    clearOnBlur?: boolean;
    handleHomeEndKeys?: boolean;
}

const Autocomplete = <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
>({
    className,
    isOptionEqualToValue,
    filterOptions,
    options,
    getOptionLabel,
    onChange,
    value,
    renderOption,
    disableClearable,
    disabled,
    freeSolo,
    onInputChange,
    renderInput,
    selectOnFocus,
    clearOnBlur,
    handleHomeEndKeys,
    ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
    return (
        <AutocompleteWrapper className={className}>
            <AutocompleteMui
                {...props}
                handleHomeEndKeys={handleHomeEndKeys}
                selectOnFocus={selectOnFocus}
                clearOnBlur={clearOnBlur}
                isOptionEqualToValue={isOptionEqualToValue}
                disableClearable={disableClearable}
                filterOptions={filterOptions}
                options={options}
                getOptionLabel={getOptionLabel}
                onChange={onChange}
                value={value}
                disabled={disabled}
                freeSolo={freeSolo}
                onInputChange={onInputChange}
                renderOption={renderOption}
                popupIcon={<HiOutlineChevronDown />}
                renderInput={renderInput}
                slots={{
                    popper: PopperStyled,
                }}
            />
        </AutocompleteWrapper>
    );
};

const PopperStyled = styled(Popper)`
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;

    .MuiPaper-root {
        border-radius: ${theme.custom.borderRadius};
    }

    .MuiPaper-root {
        box-shadow: none;
    }

    .MuiBox-root {
        display: flex;
        align-items: center;
    }

    .MuiAutocomplete-listbox {
        padding: 0;
        border: 1px solid ${theme.custom.text.borderColor};
        border-radius: ${theme.custom.borderRadius};
        box-shadow: none;
    }

    .MuiAutocomplete-option {
        border-bottom: 1px solid ${theme.custom.text.borderColor};
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        overflow: hidden;
        padding-left: 0.75rem;

        &:hover {
            background: none;
        }

        &[aria-selected='true'].Mui-focused {
            background: none;
        }

        &:last-child {
            border-bottom: none;
            outline: none;
        }
    }
`;

const AutocompleteWrapper = styled(Box)`
    .MuiInputBase-root {
        background-color: ${theme.palette.primary.white};
        align-content: center;
    }

    .MuiIconButton-root {
        svg {
            color: ${theme.custom.text.black};
            width: 1.25rem;
            height: 1.25rem;
        }

        &:hover {
            background: none;
        }
    }
`;

export default Autocomplete;
