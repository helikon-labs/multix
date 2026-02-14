import { Box, InputAdornment, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '../../components/library';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

interface Props {
    className?: string;
    threshold?: number | null;
    setThreshold: (threshold?: number) => void;
    signatoriesNumber: number;
}

const ThresholdSelection = ({ className, threshold, setThreshold, signatoriesNumber }: Props) => {
    const [error, setError] = useState('');

    const validateThreshold = useCallback(
        (value: number) => {
            if (signatoriesNumber <= 1) {
                setError(`You need at least 2 signatories`);
                setThreshold(undefined);

                return false;
            }

            if (Number.isNaN(value) || value > signatoriesNumber || value < 2) {
                setError(`Threshold must be between 2 and ${signatoriesNumber}`);
                setThreshold(undefined);

                return false;
            }

            return true;
        },
        [setThreshold, signatoriesNumber],
    );

    useEffect(() => {
        if (threshold && signatoriesNumber) {
            validateThreshold(threshold);
        }
    }, [signatoriesNumber, threshold, validateThreshold]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setError('');
            const value = Number(event.target.value);

            const isValid = validateThreshold(value);

            isValid && setThreshold(value);
        },
        [setThreshold, validateThreshold],
    );

    return (
        <Box className={className}>
            <TitleBoxStyled>
                Threshold <InfoBox />
            </TitleBoxStyled>
            <TextField
                fullWidth
                error={!!error}
                helperText={error}
                label=""
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">/{signatoriesNumber}</InputAdornment>
                        ),
                    },
                    htmlInput: { 'data-cy': 'input-threshold-creation' },
                    // @ts-expect-error
                    formHelperText: { 'data-cy': 'input-warning-message' },
                }}
                value={threshold || ''}
                onChange={handleChange}
            />
        </Box>
    );
};

const InfoBox = ({ className = '' }: { className?: string }) => (
    <Tooltip
        className={className}
        title="The threshold determines the minimum amount of signatory approvals needed for a
    multisig transaction to be executed."
    >
        <span>
            <HiOutlineInformationCircle />
        </span>
    </Tooltip>
);

const TitleBoxStyled = styled(Box)`
    font-size: 1.125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.custom.text.primary};
`;

export default styled(ThresholdSelection)`
    margin-bottom: 1rem;
`;
