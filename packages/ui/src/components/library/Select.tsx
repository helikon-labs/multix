import {
    MenuItem,
    Select as SelectMui,
    SelectChangeEvent,
    SelectProps as SelectMuiProps,
    Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import React from 'react';
import { SxProps } from '@mui/system';
import { theme } from '../../styles/theme';

interface SelectProps {
    value: string;
    menuItems?: { value: string; logo?: string }[];
    onChange: (event: SelectChangeEvent<unknown>) => void;
    minified?: boolean;
    inputSize?: 'medium' | 'large';
    fullWidth?: boolean;
    children?: React.ReactNode[] | React.ReactNode;
    sx?: SxProps<Theme>;
    testId?: string;
    className?: string;
}

const Select = ({
    className = '',
    value,
    onChange,
    menuItems,
    minified = false,
    fullWidth,
    inputSize = 'medium',
    children,
    sx,
    testId,
}: SelectProps) => {
    const matchesMediumScreen = !useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const minifiedVersion = minified ?? matchesMediumScreen;

    return (
        <SelectMuiStyled
            className={className}
            sx={sx}
            slotProps={{ minifiedVersion, inputSize }}
            value={value}
            fullWidth={fullWidth}
            IconComponent={HiOutlineChevronDown}
            MenuProps={MenuPropsStyles}
            onChange={onChange}
            data-cy={`select-${testId}`}
        >
            {menuItems
                ? menuItems.map(({ value, logo }) => (
                      <MenuItemStyled
                          key={value}
                          value={value}
                          data-cy={`select-option-${testId}-${value.toLocaleLowerCase().replace(/ /g, '-')}`}
                      >
                          {logo && (
                              <ImgStyled
                                  minifiedVersion={minifiedVersion}
                                  alt={`network-logo-${value}`}
                                  src={logo}
                              />
                          )}
                          <ItemNameStyled>{value}</ItemNameStyled>
                      </MenuItemStyled>
                  ))
                : children}
        </SelectMuiStyled>
    );
};

const MenuPropsStyles = {
    sx: {
        marginTop: '.75rem',
        '.MuiPaper-root': {
            boxShadow: 'none',
        },

        '.MuiList-root': {
            padding: 0,
            border: `1px solid ${theme.custom.text.borderColor}`,
            borderRadius: '0.5rem',
        },

        '.MuiMenuItem-root': {
            maxWidth: '100%',
            padding: '0.75rem',
            borderBottom: `1px solid ${theme.custom.text.borderColor}`,
            '&:last-child': {
                borderBottom: 'none',
            },
        },
    },
};

const SelectMuiStyled = styled(SelectMui)<
    SelectMuiProps & { slotProps: { minifiedVersion: boolean; inputSize?: string } }
>`
    display: inline-flex;
    width: 100%;
    height: ${({ slotProps: { inputSize } }) => (inputSize === 'large' ? '3.5rem' : '2.5rem')};
    padding: ${({ slotProps: { minifiedVersion } }) => (minifiedVersion ? '0.75rem' : '1rem')};
    background: ${({ theme }) => theme.palette.primary.white};
    outline: 1.5px solid ${({ theme }) => theme.custom.text.borderColor};
    text-transform: capitalize;
    border-radius: ${({ theme }) => theme.custom.borderRadius};

    fieldset {
        min-width: ${({ slotProps: { minifiedVersion } }) =>
            minifiedVersion ? '3.75rem' : '9.875rem'};
        max-width: ${({ slotProps: { minifiedVersion } }) =>
            minifiedVersion ? '3.75rem' : '12rem'};
    }

    svg {
        color: ${({ theme }) => theme.custom.text.black};
        width: 1.25rem;
        height: 1.25rem;
        top: calc(50% - 0.65em);
    }

    .MuiSelect-icon {
        right: 9px;
    }

    .MuiSelect-select {
        display: flex;
        padding: 0;
        padding-right: ${({ slotProps: { minifiedVersion } }) =>
            minifiedVersion ? '0.5rem' : '2rem'} !important;

        div:last-child {
            display: ${({ slotProps: { minifiedVersion } }) =>
                minifiedVersion ? 'none' : 'block'};
        }
    }

    .MuiOutlinedInput-notchedOutline {
        border: none;
    }
`;

const MenuItemStyled = styled(MenuItem)`
    text-transform: capitalize;
    padding: 0.75rem;
    max-width: 9.1875rem;
    box-sizing: content-box;
`;

const ImgStyled = styled('img')<
    React.ImgHTMLAttributes<HTMLImageElement> & { minifiedVersion: boolean }
>`
    width: ${({ minifiedVersion }) => (minifiedVersion ? '1.25rem' : '1.5rem')};
    height: ${({ minifiedVersion }) => (minifiedVersion ? '1.25rem' : '1.5rem')};
    margin-right: 0.5rem;
    border-radius: 50%;
    max-height: 2rem;
`;

const ItemNameStyled = styled('div')`
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${({ theme }) => theme.custom.text.black};
`;

export default Select;
