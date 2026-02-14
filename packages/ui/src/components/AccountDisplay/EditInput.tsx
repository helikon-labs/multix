import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { InputField } from '../library';
import { styled } from '@mui/material/styles';
import { HiOutlineXMark as CloseIcon, HiCheck as SubmitIcon } from 'react-icons/hi2';
import { Box, IconButton } from '@mui/material';
import { useAccountNames } from '../../contexts/AccountNamesContext';
import { EditButtonSize } from '../../types';

interface Props {
    onClose: () => void;
    address: string;
    originalName?: string;
    buttonSize?: EditButtonSize;
}

export const EditInput = ({
    onClose,
    address,
    originalName = '',
    buttonSize = 'medium',
}: Props) => {
    const { addName } = useAccountNames();
    const [name, setName] = useState(originalName);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onNameChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setName(value);
        },
        [],
    );

    const onSubmit = useCallback(() => {
        addName(name, address);
        onClose();
    }, [addName, address, name, onClose]);

    const handleSpecialKeys = useCallback(
        (e: React.KeyboardEvent) => {
            if (['Escape'].includes(e.key)) {
                onClose();
            }

            if (['Enter'].includes(e.key)) {
                onSubmit();
            }
        },
        [onClose, onSubmit],
    );

    return (
        <EditInputWrapper>
            <InputField
                onKeyDown={handleSpecialKeys}
                onChange={onNameChange}
                value={name}
                inputRef={inputRef}
                data-cy="input-name-edition"
            />
            <SubmitIconButtonStyled
                aria-label="submit"
                onClick={onSubmit}
                className={buttonSize !== 'large' ? 'small' : ''}
                data-cy="button-edition-submit"
            >
                <SubmitIcon size={16} />
            </SubmitIconButtonStyled>
            <CloseIconButtonStyled
                aria-label="close"
                onClick={onClose}
                className={buttonSize !== 'large' ? 'small' : ''}
                data-cy="button-edition-cancel"
            >
                <CloseIcon size={16} />
            </CloseIconButtonStyled>
        </EditInputWrapper>
    );
};

const EditInputWrapper = styled(Box)`
    display: flex;
    align-items: center;
`;

const CloseIconButtonStyled = styled(IconButton)`
    color: ${({ theme }) => theme.custom.gray[700]};
    &.small {
        padding: 0;
        height: 1rem;
    }
`;

const SubmitIconButtonStyled = styled(IconButton)`
    margin-left: 0.5rem !important;
    color: ${({ theme }) => theme.custom.gray[700]};
    &.small {
        padding: 0;
        height: 1rem;
    }
`;
