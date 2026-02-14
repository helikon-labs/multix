import { Box, Paper } from '@mui/material';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import AccountSelection from './AccountSelection';
import IconButton from '@mui/material/IconButton';
import { HiOutlineTrash } from 'react-icons/hi2';
import AccountDisplay from '../AccountDisplay/AccountDisplay';

interface Props {
    signatories: string[];
    setSignatories: React.Dispatch<React.SetStateAction<string[]>>;
}

const SignatorySelection = ({ signatories, setSignatories }: Props) => {
    const addSignatory = useCallback(
        (newSignatory: string) => {
            const newSignatories = [...signatories, newSignatory];
            setSignatories(newSignatories);
        },
        [setSignatories, signatories],
    );

    const removeSignatory = useCallback(
        (indexToDelete: number) => {
            const newSignatories = signatories.filter((_, index) => indexToDelete !== index);
            setSignatories(newSignatories);
        },
        [setSignatories, signatories],
    );

    return (
        <Box>
            {signatories.length > 0 && (
                <>
                    <HeadingStyled>Selected:</HeadingStyled>
                    <PaperStyled>
                        {signatories.map((address, index) => (
                            <SignatoryStyled
                                key={address}
                                data-cy={`item-signatory-${address}`}
                            >
                                <AccountDisplay address={address} />
                                <ButtonWrapperStyled>
                                    <DeleteButtonStyled
                                        aria-label="delete"
                                        onClick={() => removeSignatory(index)}
                                    >
                                        <HiOutlineTrash />
                                    </DeleteButtonStyled>
                                </ButtonWrapperStyled>
                            </SignatoryStyled>
                        ))}
                    </PaperStyled>
                    <HeadingStyled>New signatory:</HeadingStyled>
                </>
            )}
            <AddSignatoryFieldStyled>
                <AccountSelection
                    currentSelection={signatories}
                    addAccount={addSignatory}
                    withName
                    withAddButton
                    //make sure the first state is empty
                    value=""
                />
            </AddSignatoryFieldStyled>
        </Box>
    );
};

const HeadingStyled = styled('h4')`
    margin: 0.5rem 0;
    font-weight: 500;
`;

const PaperStyled = styled(Paper)`
    padding: 0;
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.custom.text.borderColor};
    border-radius: ${({ theme }) => theme.custom.borderRadius};
    box-shadow: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        padding: 0.5rem;
    }
`;

const SignatoryStyled = styled('div')`
    margin-bottom: 0.5rem;
    display: flex;
    padding: 0.5rem 0;
    justify-content: space-between;
    transition: background 0.3s linear;
    border-radius: ${({ theme }) => theme.custom.borderRadius};

    &:last-child {
        margin-bottom: 0;
    }

    &:has(button:hover) {
        background: ${({ theme }) => theme.custom.gray[300]};
        border-radius: ${({ theme }) => theme.custom.borderRadius};
    }
`;

const ButtonWrapperStyled = styled('div')`
    display: flex;
    flex: 1;
    align-self: center;
    justify-content: flex-end;
`;

const DeleteButtonStyled = styled(IconButton)`
    margin: 0 0.5rem;
    height: 2.5rem;
`;

const AddSignatoryFieldStyled = styled(Box)`
    display: flex;
    justify-content: space-between;
    transition: background 0.3s linear;
    border-radius: ${({ theme }) => theme.custom.borderRadius};
`;

export default SignatorySelection;
