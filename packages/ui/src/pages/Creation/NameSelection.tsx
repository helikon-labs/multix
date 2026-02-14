import { Alert, Box, styled } from '@mui/material';
import React, { useCallback } from 'react';
import { TextField } from '../../components/library';

interface Props {
    className?: string;
    name?: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    originalName?: string;
}

const NameSelection = ({ className, name, setName, originalName = '' }: Props) => {
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;

            setName(value);
        },
        [setName],
    );

    return (
        <Box className={className}>
            <TextField
                fullWidth
                label="Multisig name"
                value={name}
                onChange={handleChange}
                slotProps={{
                    htmlInput: { 'data-cy': 'input-name-creation' },
                }}
            />
            {!!originalName && (
                <AlertStyled severity="info">
                    The address book contains the name <i>&quot;{originalName}&quot;</i> for this
                    multisig already. Any change will override it.
                </AlertStyled>
            )}
        </Box>
    );
};

const AlertStyled = styled(Alert)`
    margin-top: 1rem;
`;

export default NameSelection;
