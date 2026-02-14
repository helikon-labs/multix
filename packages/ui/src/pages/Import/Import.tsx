import { Alert, Grid2 as Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MigratedData, useImportExportLocalData } from '../../hooks/useImportExportLocalData';
import { useNavigate, useSearchParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdOutlineFlare as FlareIcon } from 'react-icons/md';
import { Button } from '../../components/library';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import ExportedData from '../../components/ExportedData';

interface Props {
    className?: string;
}

const Import = ({ className }: Props) => {
    const { decodeData, mergeWithLocalData } = useImportExportLocalData();
    const [decodedData, setDecodedData] = useState<MigratedData | undefined>(undefined);
    const [searchParams] = useSearchParams({ d: '' });
    const [isImporting, setIsImporting] = useState(false);
    const hasDecodedData = useMemo(
        () =>
            !!decodedData &&
            ((decodedData.hiddenAccounts || []).length > 0 ||
                (decodedData.watchedPubKeys || []).length > 0 ||
                Object.entries(decodedData.pubKeyNames || {}).length > 0),
        [decodedData],
    );
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = searchParams.get('d');
        if (data) {
            setDecodedData(decodeData(data));
        }
    }, [decodeData, searchParams]);

    const onImport = useCallback(() => {
        if (!decodedData) return;

        setIsImporting(true);
        try {
            mergeWithLocalData(decodedData);
            setIsDone(true);
        } catch (e: any) {
            setError(e);
            console.error(e);
        } finally {
            setIsImporting(false);
        }
    }, [decodedData, mergeWithLocalData]);

    return (
        <Grid
            className={className}
            container
        >
            <Grid size={{ xs: 12 }}>
                <h1>Local data import</h1>
                <p>
                    With Multix, your data is private and local! Only you have access to it.
                    <br />
                </p>
            </Grid>
            {!isDone && hasDecodedData && (
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid size={{ xs: 12 }}>The following data will be imported:</Grid>
                    <Grid size={{ xs: 12 }}>
                        <ExportedData
                            hiddenAccounts={decodedData?.hiddenAccounts}
                            watchedPubKeys={decodedData?.watchedPubKeys}
                            pubKeyNames={decodedData?.pubKeyNames}
                        />
                    </Grid>
                    {!!error && <AlertStyled severity="error">{error}</AlertStyled>}

                    <ButtonWrapper
                        size={{ xs: 12 }}
                        justifyContent={'center'}
                    >
                        <Button
                            variant="primary"
                            onClick={onImport}
                            disabled={isImporting}
                        >
                            Import
                        </Button>
                    </ButtonWrapper>
                </Grid>
            )}
            {!isDone && !hasDecodedData && (
                <Grid size={{ xs: 12 }}>
                    <NoCallWrapperStyled>
                        <FlareIconStyled size={24} />
                        <div>No data to import!</div>
                    </NoCallWrapperStyled>
                </Grid>
            )}
            {isDone && (
                <>
                    <Grid
                        size={{ xs: 6 }}
                        textAlign={'right'}
                    >
                        <StyledSuccessIcon />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <StyledTitle>All done!</StyledTitle>
                    </Grid>
                    <ButtonWrapper
                        size={{ xs: 12 }}
                        justifyContent={'center'}
                    >
                        <Button
                            variant="primary"
                            onClick={() =>
                                navigate({
                                    pathname: '/',
                                })
                            }
                        >
                            Return Home
                        </Button>
                    </ButtonWrapper>
                </>
            )}
        </Grid>
    );
};

const AlertStyled = styled(Alert)`
    margin-bottom: 1rem;
`;

const StyledTitle = styled('h2')`
    display: flex;
    align-items: center;
`;

const StyledSuccessIcon = styled(HiOutlineCheckCircle)`
    font-size: 10rem;
    color: ${({ theme }) => theme.custom.text.addressColorLightGray};
    margin-right: 1rem;
`;
const ButtonWrapper = styled(Grid)`
    margin-top: 2rem;
    text-align: center;
`;

const FlareIconStyled = styled(FlareIcon)`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const NoCallWrapperStyled = styled(Paper)`
    background-color: ${({ theme }) => theme.custom.background.primary};
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 2rem;
`;
export default styled(Import)``;
