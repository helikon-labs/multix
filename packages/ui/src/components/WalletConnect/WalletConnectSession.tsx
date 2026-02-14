import { Alert, Box, CircularProgress, Grid2 as Grid, Tooltip, styled } from '@mui/material';
import { Button, InputField } from '../library';
import { useCallback, useMemo, useState, ChangeEvent } from 'react';
import { useWalletConnect } from '../../contexts/WalletConnectContext';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

export const WalletConnectSession = () => {
    const { pair } = useWalletConnect();
    const [uri, setUri] = useState('');
    const [loading, setLoading] = useState(false);
    const { selectedMultiProxy, selectedIsWatched } = useMultiProxy();
    const canUseWalletConnect = useMemo(
        () => !!selectedMultiProxy && !selectedIsWatched,
        [selectedIsWatched, selectedMultiProxy],
    );
    const onConnect = useCallback(async () => {
        try {
            setLoading(true);
            await pair({ uri });
        } catch (err: unknown) {
            alert(err);
        } finally {
            setUri('');
            setLoading(false);
        }
    }, [pair, uri]);

    const onUriChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUri(event.target.value.trim());
    }, []);

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid alignItems="center">
                {!canUseWalletConnect && (
                    <AlertStyled
                        severity="warning"
                        variant="outlined"
                        data-cy="alert-wallet-connect-warning"
                    >
                        Please first select a Pure or Multisig that you are part of, to be able to
                        use it with WalletConnect.
                    </AlertStyled>
                )}
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
                <Grid
                    container
                    direction="column"
                >
                    <TitleBoxStyled>
                        WalletConnect key <InfoBox />
                    </TitleBoxStyled>
                    <InputField
                        onChange={onUriChange}
                        value={uri}
                        disabled={!canUseWalletConnect}
                        data-cy="input-wallet-connect-key"
                    />
                    <ButtonStyled
                        variant="primary"
                        disabled={!uri || !canUseWalletConnect}
                        onClick={onConnect}
                        data-cy="button-connect-dapp"
                    >
                        {loading ? <CircularProgress size={20} /> : 'Connect Dapp'}
                    </ButtonStyled>
                </Grid>
            </Grid>
        </Grid>
    );
};

const InfoBox = () => (
    <Tooltip
        title={
            <span>
                Connect a Dapp to Multix using WalletConnect v2. More info{' '}
                <a
                    href="https://github.com/Tbaut/Multix/wiki/Connect-Dapps-to-Multix-using-WalletConnect-v2"
                    target="_blank"
                    rel="noreferrer"
                >
                    in this wiki article
                </a>
                .
            </span>
        }
    >
        <span data-cy="tooltip-wallet-connect-info">
            <HiOutlineInformationCircle />
        </span>
    </Tooltip>
);

const TitleBoxStyled = styled(Box)`
    font-size: 1.125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.custom.text.primary};
`;

const AlertStyled = styled(Alert)`
    margin-right: 0.5rem;
    border: 0;
    padding-top: 0;
`;

const ButtonStyled = styled(Button)`
    margin-top: 0.5rem;
`;
