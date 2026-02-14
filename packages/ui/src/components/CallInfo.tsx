import Expander from './Expander';
import { styled } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import { ChainInfoHuman, useApi } from '../contexts/ApiContext';
import { getExtrinsicName } from '../utils/getExtrinsicName';
import { isProxyCall } from '../utils/isProxyCall';
import { formatBigIntBalance } from '../utils/formatBnBalance';
import { HiOutlineArrowTopRightOnSquare as LaunchIcon } from 'react-icons/hi2';
import { Link } from './library';
import { usePjsLinks } from '../hooks/usePjsLinks';
import { Alert } from '@mui/material';
import { CallDataInfoFromChain } from '../contexts/PendingTxContext';
import { JSONprint } from '../utils/jsonPrint';
import { Transaction } from 'polkadot-api';
import MultisigCompactDisplay from './MultisigCompactDisplay';
import { IAssetsContext, useAssets } from '../contexts/AssetsContext';
import { usePplApi } from '../contexts/PeopleChainApiContext';

interface Props {
    aggregatedData: Omit<CallDataInfoFromChain, 'from' | 'timestamp'>;
    expanded?: boolean;
    children?: ReactNode;
    className?: string;
    withLink?: boolean;
    withProxyFiltered?: boolean;
    isPplChainTx: boolean;
    hideTooLargeCallData?: boolean;
}

interface CreateTreeParams {
    decodedCall?: Transaction<any, any, any, any>['decodedCall'];
    decimals: number;
    unit: string;
    name?: string;
    chainInfo?: ChainInfoHuman;
    ahAssets: IAssetsContext['assets'];
}

const isWhiteListedCall = (extrinsicName: string) => {
    return [
        'Balances.transfer',
        'Balances.transfer_keep_alive',
        'Balances.transfer_all',
        'Balances.transfer_allow_death',
        'Bounties.award_bounty',
        'ChildBounties.accept_curator',
        'ChildBounties.add_child_bounty',
        'ChildBounties.award_child_bounty',
        'ChildBounties.claim_child_bounty',
        'ChildBounties.close_child_bounty',
        'ChildBounties.propose_curator',
        'ChildBounties.unassign_curator',
        'Staking.bond',
        'Staking.unbond',
        'Staking.bond_extra',
        'Staking.rebond',
        'Staking.nominate',
        'Proxy.add_proxy',
        'Proxy.remove_proxy',
        'Proxy.kill_pure',
        'ConvictionVoting.delegate',
        'ConvictionVoting.vote',
        'ConvictionVoting.remove_vote',
        'ConvictionVoting.undelegate',
        'ConvictionVoting.unlock',
        'System.remark',
        //Asset Hub
        'Assets.transfer_keep_alive',
        'Assets.transfer',
        // Hydration
        'Tokens.transfer',
        // Polimec
        'Vesting.vested_transfer',
    ].includes(extrinsicName);
};

const isPreventBalanceFormat = (extrinsicName: string) => {
    return ['Tokens.transfer'].includes(extrinsicName);
};

const isBatchedCall = (extrinsicName: string) => {
    return ['Utility.batch', 'Utility.batch_all', 'Utility.force_batch'].includes(extrinsicName);
};

const isAssetTransferCall = (extrinsicName: string) => {
    return ['Assets.transfer_keep_alive', 'Assets.transfer'].includes(extrinsicName);
};

const getBalanceKey = (value: Record<string, any>) => {
    return ['value', 'fee', 'max_additional', 'balance'].find(
        (key) => typeof value[key] === 'bigint',
    );
};

const getMultiAddressKey = (value: Record<string, any>) => {
    return ['dest', 'beneficiary', 'curator', 'delegate', 'spawner', 'to', 'target', 'real'].find(
        (key) => typeof value[key] === 'object' && value[key].type === 'Id',
    );
};

const isAssetTransferValue = (value: Record<string, any>) => {
    return !!value.id && !!value.amount && !!value.target;
};

interface DisplayBalanceProps {
    amount: bigint;
    label: string;
    chainInfo: ChainInfoHuman;
    id: string;
}

const DisplayBalance = ({ amount, label, chainInfo, id }: DisplayBalanceProps) => (
    <li key={id}>
        {label}:{' '}
        {formatBigIntBalance(amount, chainInfo?.tokenDecimals, {
            tokenSymbol: chainInfo?.tokenSymbol,
        })}
    </li>
);

interface DisplayAccountProps {
    address: string;
    label: string;
}

const DisplayAccount = ({ address, label }: DisplayAccountProps) => (
    <li key={`multiadd-${address}`}>
        {label}: <MultisigCompactDisplay address={address} />
    </li>
);

interface EachFieldRenderedParams {
    extrinsicName: string;
    value: Record<string, any>;
    chainInfo: ChainInfoHuman;
    id: string;
    ahAssets: IAssetsContext['assets'];
}

const eachFieldRendered = ({ value, chainInfo, id, extrinsicName }: EachFieldRenderedParams) => {
    const preventBalanceFormating = isPreventBalanceFormat(extrinsicName);

    // for transfer, nomination, staking, bounties
    // We should make sure this is not done for hydration Token transfers
    const balanceKey = getBalanceKey(value);
    if (!preventBalanceFormating && !!balanceKey) {
        return (
            <DisplayBalance
                amount={value[balanceKey]}
                label={balanceKey}
                chainInfo={chainInfo}
                id={id}
            />
        );
    }

    // for Staking.nominate
    if (Array.isArray(value.targets) && value.targets.length > 0) {
        return (
            <li key={`${id}-targets`}>
                targets:{' '}
                <ul>
                    {value.targets.map((target: any, index) => {
                        const address = target.type === 'Id' ? target.value : null;

                        if (address) {
                            return (
                                <li key={`${index}-${address}`}>
                                    <MultisigCompactDisplay address={address} />
                                </li>
                            );
                        }

                        return <li key={`${index}-${address}`}>{JSONprint(target)}</li>;
                    })}
                </ul>
            </li>
        );
    }

    // for Staking.bond
    if (value.payee?.type === 'Account') {
        return (
            <li key={`payee-${value.payee?.value}`}>
                payee: <MultisigCompactDisplay address={value.payee?.value} />
            </li>
        );
    }

    // old style accounts
    if (value.dest && typeof value.dest === 'string') {
        return (
            <li key={`dest-${value.dest}`}>
                dest: <MultisigCompactDisplay address={value.dest} />
            </li>
        );
    }

    // if that's an Account with MultiAddress.Id
    const multiAddressKey = getMultiAddressKey(value);
    if (multiAddressKey) {
        return (
            <DisplayAccount
                address={value[multiAddressKey]?.value}
                label={multiAddressKey}
            />
        );
    }

    return <li key={`not-pretty-decoded-${id}`}>{JSONprint(value)} </li>;
};

interface PreparedCallParams {
    decodedCall: CreateTreeParams['decodedCall'];
    chainInfo: ChainInfoHuman;
    showExtrinsicName?: boolean;
    isFirstCall?: boolean;
    ahAssets: IAssetsContext['assets'];
}

const preparedCall = ({
    decodedCall,
    chainInfo,
    showExtrinsicName = false,
    isFirstCall = false,
    ahAssets,
}: PreparedCallParams) => {
    if (!decodedCall) return;

    const extrinsicName = getExtrinsicName(decodedCall.type, decodedCall.value.type);

    if (isProxyCall(extrinsicName)) {
        const lowerLevelCall = decodedCall.value.value.call;

        return (
            <>
                <StyleProxyDisplay>
                    <DisplayAccount
                        address={decodedCall.value.value.real.value}
                        label={'Proxy'}
                    />
                </StyleProxyDisplay>
                <BatchCallStyled data-cy={`batch-call-item`}>
                    {preparedCall({
                        decodedCall: lowerLevelCall as CreateTreeParams['decodedCall'],
                        chainInfo,
                        showExtrinsicName: true,
                        ahAssets,
                    })}
                </BatchCallStyled>
            </>
        );
    }

    if (isBatchedCall(extrinsicName)) {
        const lowerLevelCalls = decodedCall.value.value.calls as Array<Record<string, any>>;

        return lowerLevelCalls.map((call, index) => {
            return (
                <BatchCallStyled
                    key={`${call.type}-${index}`}
                    data-cy={`batch-call-item`}
                >
                    {preparedCall({
                        decodedCall: call as CreateTreeParams['decodedCall'],
                        chainInfo,
                        showExtrinsicName: true,
                        ahAssets,
                    })}
                </BatchCallStyled>
            );
        });
    }

    const ahTransfer = decodedCall.value.value;
    if (
        isAssetTransferCall(extrinsicName) &&
        isAssetTransferValue(ahTransfer) &&
        !!ahAssets &&
        !!ahAssets[ahTransfer.id]
    ) {
        return (
            <>
                {showExtrinsicName && <ExtrinsicNameStyled>{extrinsicName}</ExtrinsicNameStyled>}
                <ul>
                    <li>
                        id: {ahTransfer.id} ({ahAssets[ahTransfer.id].name})
                    </li>
                    <StyledAmount>
                        <li>
                            amount:{' '}
                            {formatBigIntBalance(
                                ahTransfer.amount,
                                ahAssets[ahTransfer.id].decimals,
                                {
                                    tokenSymbol: ahAssets[ahTransfer.id].symbol,
                                },
                            )}
                        </li>
                        <ImgStyled
                            alt={`asset-logo-${ahTransfer.id}`}
                            src={ahAssets[ahTransfer.id].logo}
                        />
                    </StyledAmount>
                    <DisplayAccount
                        address={ahTransfer.target.value}
                        label="target"
                    />
                </ul>
            </>
        );
    }

    if (isWhiteListedCall(extrinsicName)) {
        const lowerLevelCall = decodedCall.value.value;
        if (typeof lowerLevelCall === 'object') {
            return (
                <>
                    {showExtrinsicName && (
                        <ExtrinsicNameStyled>{extrinsicName}</ExtrinsicNameStyled>
                    )}
                    <ul>
                        {Object.entries(lowerLevelCall).map(([key, value], index) =>
                            eachFieldRendered({
                                value: { [key]: value },
                                chainInfo,
                                id: `${decodedCall.type}-${index}`,
                                extrinsicName,
                                ahAssets,
                            }),
                        )}
                    </ul>
                </>
            );
        } else {
            return <PreStyled>{JSONprint(decodedCall)}</PreStyled>;
        }
    }

    if (isFirstCall) {
        return <PreStyled>{JSONprint(decodedCall.value.value)}</PreStyled>;
    }

    return <PreStyled>{JSONprint(decodedCall)}</PreStyled>;
};

const createTree = ({ name, decodedCall, chainInfo, ahAssets }: CreateTreeParams) => {
    if (!decodedCall) return;
    if (!name) return;
    if (!chainInfo) return;

    return preparedCall({ decodedCall, chainInfo, isFirstCall: true, ahAssets });
};

const filterProxyProxy = (agg: Props['aggregatedData']): Props['aggregatedData'] => {
    const { decodedCall, name } = agg;
    const isProxy = isProxyCall(name);

    if (!isProxy || !decodedCall?.value.value.call) {
        return agg;
    }

    const call = decodedCall.value.value.call;

    const newName = getExtrinsicName(call.type, call.value.type);
    return {
        ...agg,
        name: newName,
        decodedCall: call,
    };
};

const CallInfo = ({
    aggregatedData,
    expanded = false,
    children,
    className,
    withLink = false,
    withProxyFiltered = true,
    isPplChainTx,
    hideTooLargeCallData = false,
}: Props) => {
    const { decodedCall, name } = withProxyFiltered
        ? filterProxyProxy(aggregatedData)
        : aggregatedData;
    const { chainInfo: chainInfoNormal } = useApi();
    const { pplChainInfo } = usePplApi();
    const chainInfo = useMemo(
        () => (isPplChainTx ? pplChainInfo : chainInfoNormal),
        [chainInfoNormal, isPplChainTx, pplChainInfo],
    );
    const { assets } = useAssets();
    const decimals = useMemo(() => chainInfo?.tokenDecimals || 0, [chainInfo]);
    const unit = useMemo(() => chainInfo?.tokenSymbol || '', [chainInfo]);
    const { getDecodeUrl } = usePjsLinks({ isPplChain: isPplChainTx });
    const link = useMemo(
        () => aggregatedData.callData && getDecodeUrl(aggregatedData.callData),
        [aggregatedData, getDecodeUrl],
    );
    const hasArgs = useMemo(() => decodedCall && decodedCall?.value?.value, [decodedCall]);

    const callDataTooLong = useMemo(() => {
        if (!aggregatedData.callData) return false;

        // the UI get super slow with large call data
        return hideTooLargeCallData && aggregatedData.callData.length > 1000000;
    }, [aggregatedData.callData, hideTooLargeCallData]);

    return (
        <div
            className={className}
            data-cy="container-call-info"
        >
            <CallNameStyled
                className="callName"
                data-cy="label-call-name"
            >
                {name}
                {!!aggregatedData.callData && withLink && (
                    <LinkStyled
                        href={link}
                        target="_blank"
                    >
                        <LaunchIcon size={20} />
                    </LinkStyled>
                )}
            </CallNameStyled>
            {!aggregatedData.callData && (
                <AlertStyled
                    className={className}
                    severity="info"
                    variant="outlined"
                    data-cy="alert-no-call-data"
                >
                    No Call data found on-chain. Use Multix to initiate multisig transactions and
                    avoid this annoyance.
                </AlertStyled>
            )}
            {!callDataTooLong && hasArgs && (
                <Expander
                    expanded={expanded}
                    title="Params"
                    content={createTree({
                        name,
                        decodedCall,
                        decimals,
                        unit,
                        chainInfo,
                        ahAssets: assets,
                    })}
                />
            )}
            {callDataTooLong && (
                <AlertStyled
                    className={className}
                    severity="info"
                    variant="outlined"
                    data-cy="alert-no-call-data"
                >
                    CallData too long. Click on &quot;Review&quot; to be able to read it.
                </AlertStyled>
            )}
            {children}
        </div>
    );
};

const AlertStyled = styled(Alert)`
    margin-right: 0.5rem;
    border: 0;
`;

const CallNameStyled = styled('h4')`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
`;

const LinkStyled = styled(Link)`
    display: flex;
    padding-left: 0.5rem;
`;

const PreStyled = styled('pre')`
    margin-top: 0;
    overflow: auto;
`;

const BatchCallStyled = styled('div')`
    border-radius: ${({ theme }) => theme.custom.borderRadius};
    border: 1px solid ${({ theme }) => theme.custom.gray[400]};
    margin-top: 1rem;
    margin-left: 1rem;
    padding: 1rem;
    padding-top: 0;
`;

const ExtrinsicNameStyled = styled('span')`
    font-weight: 500;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
    margin-left: -1rem;
    border-top-left-radius: 0.75rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    display: inline-block;
`;

export default styled(CallInfo)`
    flex: 1;
    overflow: hidden;

    .params {
        word-wrap: break-word;
    }
`;
const ImgStyled = styled('img')`
    margin-left: 0.5rem;
    width: 1.5rem;
    border-radius: 50%;
`;

const StyledAmount = styled('div')`
    display: inline-flex;
    align-items: center;
`;

const StyleProxyDisplay = styled('div')`
    margin-left: 2rem;
`;
