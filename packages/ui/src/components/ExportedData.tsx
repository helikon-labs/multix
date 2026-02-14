import { HiddenAccount } from '../contexts/HiddenAccountsContext';
import { AccountNames } from '../contexts/AccountNamesContext';
import { useGetEncodedAddress } from '../hooks/useGetEncodedAddress';
import { Grid2 as Grid, styled } from '@mui/material';
import AccountDisplay from './AccountDisplay/AccountDisplay';
import Expander from './Expander';

interface ExportedDataProps {
    className?: string;
    watchedPubKeys?: string[];
    hiddenAccounts?: HiddenAccount[];
    pubKeyNames?: AccountNames;
}

const ExportedData = ({
    className,
    watchedPubKeys,
    hiddenAccounts,
    pubKeyNames,
}: ExportedDataProps) => {
    const getEncodedAddress = useGetEncodedAddress();

    return (
        <div className={className}>
            {watchedPubKeys && watchedPubKeys.length > 0 && (
                <>
                    <ExpanderWrapper size={{ xs: 12 }}>
                        <Expander
                            title={`Watched accounts (${watchedPubKeys.length})`}
                            content={watchedPubKeys.map((pubKey) => (
                                <EntryWrapperStyled key={pubKey}>
                                    <AccountDisplay
                                        iconSize="small"
                                        address={getEncodedAddress(pubKey) || ''}
                                        canEdit={false}
                                    />
                                </EntryWrapperStyled>
                            ))}
                        />
                    </ExpanderWrapper>
                </>
            )}
            {hiddenAccounts && hiddenAccounts.length > 0 && (
                <>
                    <ExpanderWrapper size={{ xs: 12 }}>
                        <Expander
                            title={`Hidden accounts (${hiddenAccounts.length})`}
                            content={hiddenAccounts.map(({ pubKey, network }) => (
                                <EntryWrapperStyled key={pubKey}>
                                    {network}:{' '}
                                    <AccountDisplay
                                        iconSize="small"
                                        address={getEncodedAddress(pubKey) || ''}
                                        canEdit={false}
                                    />
                                </EntryWrapperStyled>
                            ))}
                        />
                    </ExpanderWrapper>
                </>
            )}
            {pubKeyNames && Object.entries(pubKeyNames).length > 0 && (
                <>
                    <ExpanderWrapper size={{ xs: 12 }}>
                        <Expander
                            title={`Account names (${Object.entries(pubKeyNames).length})`}
                            content={Object.entries(pubKeyNames).map(([pubKey, name]) => (
                                <EntryWrapperStyled key={pubKey}>
                                    {name}:{' '}
                                    <AccountDisplay
                                        iconSize="small"
                                        address={getEncodedAddress(pubKey) || ''}
                                        canEdit={false}
                                        withName={false}
                                    />
                                </EntryWrapperStyled>
                            ))}
                        />
                    </ExpanderWrapper>
                </>
            )}
        </div>
    );
};

const ExpanderWrapper = styled(Grid)`
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.custom.background.primary};
    border-radius: 0.5rem;
`;

const EntryWrapperStyled = styled('div')`
    padding-left: 2rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
`;

export default ExportedData;
