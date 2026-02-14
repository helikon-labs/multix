import { Grid2, styled } from '@mui/material';
import { useImportExportLocalData } from '../../hooks/useImportExportLocalData';
import { useCallback, useEffect, useState } from 'react';
import { copyTextToClipboard } from '../../utils/copyToClipboard';
import { Button } from '../../components/library';
import { getImportUrl } from '../../utils/getImportUrl';
import ExportedData from '../../components/ExportedData';
import { useAccountNames } from '../../contexts/AccountNamesContext';
import { useHiddenAccounts } from '../../contexts/HiddenAccountsContext';
import { useWatchedAccounts } from '../../contexts/WatchedAccountsContext';

interface Props {
    className?: string;
}
export const Export = ({ className }: Props) => {
    const { encodedData } = useImportExportLocalData();
    const [isCopied, setIsCopied] = useState(false);
    const { watchedPubKeys } = useWatchedAccounts();
    const { hiddenAccounts } = useHiddenAccounts();
    const { pubKeyNames } = useAccountNames();

    useEffect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isCopied]);

    const handleCopy = useCallback(() => {
        if (!encodedData) return;

        setIsCopied(true);
        copyTextToClipboard(getImportUrl(encodedData));
    }, [encodedData]);

    return (
        <Grid2
            className={className}
            container
        >
            <Grid2 size={{ xs: 12 }}>
                Use a link to import your data in another browser, another device, you name it!
                <br />
                Just paste this link in a browser to import all your data:
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                <ExportedData
                    hiddenAccounts={hiddenAccounts}
                    watchedPubKeys={watchedPubKeys}
                    pubKeyNames={pubKeyNames}
                />
            </Grid2>
            <ButtonWrapper
                size={{ xs: 12 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    variant="primary"
                    onClick={handleCopy}
                    disabled={isCopied}
                >
                    {isCopied ? 'Copied!' : 'Copy link'}
                </Button>
            </ButtonWrapper>
        </Grid2>
    );
};

const ButtonWrapper = styled(Grid2)`
    margin-top: 1rem;
`;
