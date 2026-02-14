import { css, styled } from '@mui/material/styles';
import React from 'react';
import { theme } from '../../styles/theme';

interface InputFieldProps {
    value?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}

export const InputField = ({
    label,
    value,
    onChange,
    onKeyDown,
    disabled,
    inputRef,
    ...props
}: InputFieldProps) => (
    <LabelStyled>
        <span>{label}</span>
        <InputStyled
            {...props}
            ref={inputRef}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
            disabled={disabled}
        />
    </LabelStyled>
);

const LabelStyled = styled('label')`
    display: flex;
    flex-direction: column;

    span {
        margin-bottom: 4px;
        font-size: 1.125rem;
        font-weight: 500;
        color: ${(props) => props.theme.custom.text.primary};
    }
`;
export const InputStyledBaseCss = css`
    width: 100%;
    min-height: 41px;
    color: ${theme.custom.text.black};
    padding: 0.5rem 1.25rem;
    border: none;
    outline: 1.5px solid ${theme.custom.text.borderColor};
    border-radius: ${theme.custom.borderRadius};
    font-size: 1rem;
    font-family: 'Jost', sans-serif;

    &:focus-visible {
        outline: 3px solid ${theme.custom.text.borderColor};
    }

    &:disabled {
        cursor: not-allowed;
        background: #f3f6f9;
        outline: 1.5px solid #e7e7e7;
        border-radius: ${theme.custom.borderRadius};
    }
`;

const InputStyled = styled('input')`
    ${InputStyledBaseCss};
    background: ${(props) => props.theme.palette.primary.white};
`;
