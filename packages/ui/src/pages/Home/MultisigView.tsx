import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import { AccountBadge, assetHubKeys } from '../../types';
// import MultisigActionMenu from './MultisigActionMenu'
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import MultisigAccordion from './MultisigAccordion';
import { Balance } from '../../components/library';
import { camelcaseToString } from '../../utils/camelcasetoString';
import { useMemo } from 'react';
import { isContextIn, useApi } from '../../contexts/ApiContext';
import { AH_SUPPORTED_ASSETS } from '../../constants';
import AssetBalance from '../../components/library/AssetBalance';

const MultisigView = () => {
    const ctx = useApi();
    const { selectedMultiProxy, selectedHasProxy } = useMultiProxy();
    const isAssetHub = useMemo(() => isContextIn(ctx, assetHubKeys), [ctx]);

    return (
        <MultisigViewWrapperStyled>
            <HeaderStyled>
                {selectedMultiProxy && (
                    <h3>{selectedHasProxy ? 'Controlled by' : 'Account Details'}</h3>
                )}
                {/*{selectedHasProxy && (*/}
                {/*  <BoxStyled>*/}
                {/*    <MultisigActionMenu*/}
                {/*      menuButtonBorder={'none'}*/}
                {/*      withNewTransactionButton={false}*/}
                {/*    />*/}
                {/*  </BoxStyled>*/}
                {/*)}*/}
            </HeaderStyled>
            <MultisigList>
                {selectedMultiProxy &&
                    selectedMultiProxy.multisigs.map((multisig) => {
                        return (
                            <MultisigWrapperStyled
                                selectedHasProxy={selectedHasProxy}
                                key={multisig.address}
                                data-cy="container-multisig-details"
                            >
                                {selectedHasProxy && (
                                    <AccountDisplayWrapperStyled data-cy="container-multisig-account-summary">
                                        <AccountDisplay
                                            address={multisig.address || ''}
                                            badge={AccountBadge.MULTI}
                                            canEdit
                                            canCopy
                                        />
                                    </AccountDisplayWrapperStyled>
                                )}
                                <List>
                                    <ListElement data-cy="list-item-threshold">
                                        <ListFieldText>Threshold</ListFieldText>
                                        <ChipStyled
                                            label={`${multisig.threshold}/${multisig.signatories?.length}`}
                                        />
                                    </ListElement>
                                    {multisig.type && (
                                        <ListElement data-cy="list-item-proxy-type">
                                            <ListFieldText>Proxy Type</ListFieldText>
                                            <ListFieldValue>
                                                {camelcaseToString(multisig.type)}
                                            </ListFieldValue>
                                        </ListElement>
                                    )}
                                    {selectedHasProxy && (
                                        <ListElement data-cy="list-item-balance">
                                            <ListFieldText className="isBalance">
                                                Balance
                                            </ListFieldText>
                                            <BalanceAmountStyled>
                                                <Balance address={multisig.address} />
                                                {isAssetHub &&
                                                    AH_SUPPORTED_ASSETS.map(({ assetId, logo }) => (
                                                        <AssetBalance
                                                            key={assetId}
                                                            address={multisig.address}
                                                            assetId={assetId}
                                                            logo={logo}
                                                        />
                                                    ))}
                                            </BalanceAmountStyled>
                                        </ListElement>
                                    )}
                                </List>
                                <MultisigAccordion multisig={multisig} />
                            </MultisigWrapperStyled>
                        );
                    })}
            </MultisigList>
        </MultisigViewWrapperStyled>
    );
};

const BalanceAmountStyled = styled('div')`
    font-size: 1rem;
    color: ${({ theme }) => theme.custom.gray[800]};
    white-space: nowrap;
`;

const HeaderStyled = styled('header')`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        margin-top: 0;
    }
`;

const MultisigList = styled('div')`
    & > :not(:first-of-type) {
        margin-top: 1rem;
    }
`;

const MultisigViewWrapperStyled = styled('div')`
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.custom.text.borderColor};
    border-radius: ${({ theme }) => theme.custom.borderRadius};

    h3 {
        font-size: 1.125rem;
        font-weight: 400;
        margin-bottom: 0.75rem;
        color: ${({ theme }) => theme.custom.gray[700]};
    }

    .MuiPaper-root {
        box-shadow: none;

        &:before {
            display: none;
        }
    }
`;

const MultisigWrapperStyled = styled('div')<{ selectedHasProxy: boolean }>`
    border: 1px solid
        ${({ theme, selectedHasProxy }) =>
            selectedHasProxy ? theme.custom.text.borderColor : 'none'};
    border-radius: ${({ theme, selectedHasProxy }) =>
        selectedHasProxy ? theme.custom.borderRadius : '0'};
    padding: ${({ selectedHasProxy }) => (selectedHasProxy ? '1rem 0.75rem' : '0')};

    &:not(:first-of-type) {
        margin-bottom: 0.5rem;
    }
`;
const List = styled('div')``;

const ListElement = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: ${({ theme }) => theme.custom.borderRadius};
    border: 1px solid ${({ theme }) => theme.custom.gray[400]};
    background: ${({ theme }) => theme.custom.gray[200]};
`;

const ListFieldText = styled('div')`
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.custom.gray[800]};
    &.isBalance {
        align-self: flex-start;
    }
`;

const ListFieldValue = styled('div')`
    color: ${({ theme }) => theme.custom.text.secondary};
    font-size: 1rem;
    font-weight: 400;
`;

const AccountDisplayWrapperStyled = styled('div')`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const ChipStyled = styled(Chip)`
    background: none;

    .MuiChip-label {
        color: ${({ theme }) => theme.custom.gray[700]};
        font-size: 1rem;
        font-weight: 400;
        padding-right: 0;
    }
`;

export default MultisigView;
