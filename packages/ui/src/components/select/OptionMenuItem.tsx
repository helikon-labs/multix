import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface OptionMenuProps {
    keyValue: string;
    children: React.ReactNode[] | React.ReactNode;
}

const OptionMenuItem = ({ keyValue, children, ...props }: OptionMenuProps) => (
    <BoxStyled
        key={keyValue}
        {...props}
    >
        {children}
    </BoxStyled>
);

const BoxStyled = styled(Box)`
    &.MuiAutocomplete-option {
        background-color: transparent;
        cursor: pointer;
        padding: 0.75rem;
        border-bottom: 1px solid ${({ theme }) => theme.custom.text.borderColor};
        font-size: 1rem;
        color: ${({ theme }) => theme.custom.gray[900]};
        transition: background-color 0.2s ease-in-out;

        &:last-child {
            border-bottom: none;
        }

        &[aria-selected='true'].Mui-focused {
            background-color: transparent;
        }

        &:hover {
            background-color: ${({ theme }) => theme.custom.gray[400]} !important;
        }
    }

    .MuiBox-root {
        div {
            font-size: 1rem;
            color: ${({ theme }) => theme.custom.gray[900]};
        }
    }
`;

export default OptionMenuItem;
