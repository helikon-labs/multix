import {
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid2 as Grid,
} from '@mui/material';
import { Button } from '../library';
import { styled } from '@mui/material/styles';
import { ModalCloseButton } from '../library/ModalCloseButton';
import { useCallback, useState } from 'react';

interface Props {
    onClose: () => void;
    className?: string;
}

export const LOCALSTORAGE_KEY = 'multix.dontShowHiddenAccountInfo';

const HiddenAccountInfo = ({ onClose, className }: Props) => {
    const [dontShow, setDontShow] = useState(false);
    const onClick = useCallback(() => {
        onClose();
        if (dontShow) {
            localStorage.setItem(LOCALSTORAGE_KEY, 'true');
        }
    }, [dontShow, onClose]);

    return (
        <Dialog
            fullWidth
            maxWidth={'xs'}
            open={localStorage.getItem(LOCALSTORAGE_KEY) === 'true' ? false : true}
            className={className}
        >
            <ModalCloseButton onClose={onClose} />
            <DialogTitle>Account hidden!</DialogTitle>
            <DialogContent data-cy="modal-hidden-account-info">
                <Grid container>
                    <Grid size={12}>
                        This account is now hidden for this network. To show it again go to Settings
                        &gt; Hidden Accounts.
                    </Grid>
                    <FooterContainerStyled
                        container
                        size={12}
                    >
                        <FormControlLabel
                            label="Don't show this message again"
                            control={
                                <Checkbox
                                    checked={dontShow}
                                    onChange={() => {
                                        setDontShow(!dontShow);
                                    }}
                                    // @ts-expect-error
                                    inputProps={{ 'data-cy': 'checkbox-dont-show-again' }}
                                />
                            }
                        />
                        <Button
                            data-cy="button-hidden-account-info-gotit"
                            className="closeButton"
                            variant="primary"
                            onClick={onClick}
                        >
                            Got it
                        </Button>
                    </FooterContainerStyled>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const FooterContainerStyled = styled(Grid)`
    margin-top: 1rem;

    button:last-child {
        margin-left: auto;
    }

    .closeButton {
        margin-left: auto;
    }
`;

export default styled(HiddenAccountInfo)`
    .accountEdition {
        margin-bottom: 1rem;
        align-items: end;
    }
`;
