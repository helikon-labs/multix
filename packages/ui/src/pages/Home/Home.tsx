import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { useSearchParams } from 'react-router';
import SuccessCreation from '../../components/SuccessCreation';
import NewMulisigAlert from '../../components/NewMulisigAlert';
import { styled } from '@mui/material/styles';
import HeaderView from './HeaderView';
import MultisigView from './MultisigView';
import TransactionList from '../../components/Transactions/TransactionList';
import { ConnectOrWatch } from '../../components/ConnectCreateOrWatch';
import { useDisplayLoader } from '../../hooks/useDisplayLoader';
import { useDisplayError } from '../../hooks/useDisplayError';

interface HomeProps {
    className?: string;
}

const Home = ({ className }: HomeProps) => {
    const [searchParams, setSearchParams] = useSearchParams({
        creationInProgress: 'false',
    });
    const { multiProxyList } = useMultiProxy();
    const showNewMultisigAlert = useMemo(
        () => searchParams.get('creationInProgress') === 'true',
        [searchParams],
    );
    const DisplayError = useDisplayError();
    const DisplayLoader = useDisplayLoader();

    const onCloseNewMultisigAlert = useCallback(() => {
        setSearchParams((prev) => {
            prev.set('creationInProgress', 'false');
            return prev;
        });
    }, [setSearchParams]);

    useEffect(() => {
        if (searchParams.get('creationInProgress') === 'true') {
            setTimeout(() => {
                onCloseNewMultisigAlert();
            }, 20000);
        }
    }, [onCloseNewMultisigAlert, searchParams]);

    if (DisplayLoader) {
        return DisplayLoader;
    }

    if (DisplayError) {
        return DisplayError;
    }

    if (multiProxyList.length === 0) {
        return (
            <MessageWrapper>
                {showNewMultisigAlert ? <SuccessCreation /> : <ConnectOrWatch />}
            </MessageWrapper>
        );
    }

    return (
        <Grid
            className={className}
            container
        >
            {showNewMultisigAlert && multiProxyList.length > 0 && (
                <NewMulisigAlert onClose={onCloseNewMultisigAlert} />
            )}
            <Grid
                alignItems="center"
                size={{ xs: 12 }}
            >
                <HeaderView />
            </Grid>
            <Grid
                alignItems="center"
                size={{ xs: 12, md: 5, lg: 4 }}
            >
                <MultisigView />
            </Grid>
            {multiProxyList.length > 0 && (
                <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                    <TransactionsWrapperStyled data-cy="container-transaction-list">
                        <TransactionList />
                    </TransactionsWrapperStyled>
                </Grid>
            )}
        </Grid>
    );
};

const MessageWrapper = (props: PropsWithChildren) => {
    return (
        <Grid
            container
            spacing={2}
        >
            <LoaderBoxStyled>{props.children}</LoaderBoxStyled>
        </Grid>
    );
};

const LoaderBoxStyled = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
`;

const TransactionsWrapperStyled = styled('div')`
    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        margin-left: 1.5rem;
    }
`;

export default Home;
