import { Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';
import { TextField } from '../library';
import CallInfo from '../CallInfo';
import { useCallInfoFromCallData } from '../../hooks/useCallInfoFromCallData';
import { getExtrinsicName } from '../../utils/getExtrinsicName';
import { usePjsLinks } from '../../hooks/usePjsLinks';
import { Binary, HexString, Transaction } from 'polkadot-api';
import { getPapiHowLink } from '../../utils/getPapiHowLink';
import { getPubKeyFromAddress } from '../../utils/getPubKeyFromAddress';

interface Props {
    className?: string;
    onSetExtrinsic: (ext: Transaction<any, any, any, any>) => void;
    currentProxy?: string;
}

const FromCallData = ({ className, onSetExtrinsic, currentProxy }: Props) => {
    const { api } = useApi();
    const [pastedCallData, setPastedCallData] = useState<HexString | undefined>(undefined);
    const [callDataError, setCallDataError] = useState('');
    const [isProxyProxyRemoved, setIsProxyProxyRemoved] = useState(false);
    const [callDataToUse, setCallDataToUse] = useState<HexString | undefined>();
    const callIdRef = useRef(0);

    const removeProxyProxyCall = useCallback(
        async (call: HexString) => {
            if (!api || !currentProxy) return { isRemoved: false, call };
            try {
                const decodedCall = (await api.txFromCallData(Binary.fromHex(call))).decodedCall;
                const real = `0x${call.substring(8, 72)}`;
                const currentProxyAddress = getPubKeyFromAddress(currentProxy);
                // check if this call is a proxy.proxy
                if (
                    decodedCall.type === 'Proxy' &&
                    decodedCall.value.type === 'proxy' &&
                    real === currentProxyAddress
                ) {
                    // a proxy.proxy call is encoded with e.g
                    // callIndex 1e00
                    // real 00 eb53ed54b7f921a438923e6eb52c4d89afc5c0fed5d0d15fb78648c53da227a0
                    // forceProxyType 00
                    // only remove the proxy if it's the proxy associated with the multisig
                    return {
                        isRemoved: true,
                        call: `0x${call.substring(74)}` as HexString,
                    };
                }
                return {
                    isRemoved: false,
                    call,
                };
            } catch (e: unknown) {
                !!e && setCallDataError(String(e));
                return {
                    isRemoved: false,
                    call: undefined,
                };
            }
        },
        [api, currentProxy],
    );

    const { callInfo } = useCallInfoFromCallData({ isPplTx: false, callData: callDataToUse });
    const { callInfo: pastedCallInfo } = useCallInfoFromCallData({
        isPplTx: false,
        callData: pastedCallData,
    });
    const { extrinsicUrl } = usePjsLinks({ isPplChain: false });

    useEffect(() => {
        if (!api || !pastedCallData || !callInfo?.call) {
            return;
        }
        onSetExtrinsic(callInfo.call);
    }, [api, pastedCallData, callInfo, onSetExtrinsic]);

    const onCallDataChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            setCallDataError('');
            const pasted = event.target.value.trim() as HexString;
            setPastedCallData(pasted);
            setIsProxyProxyRemoved(false);
            const callId = ++callIdRef.current;
            const result = await removeProxyProxyCall(pasted);
            if (callId !== callIdRef.current) return;
            setIsProxyProxyRemoved(result.isRemoved);
            setCallDataToUse(result.call);
        },
        [removeProxyProxyCall],
    );

    return (
        <Box className={className}>
            <AlertStyled severity="info">
                Paste below the &quot;encoded call data&quot; from{' '}
                <a
                    href={getPapiHowLink()}
                    target="_blank"
                    rel="noreferrer"
                >
                    papi console
                </a>{' '}
                or{' '}
                <a
                    href={extrinsicUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    pjs manual extrinsic
                </a>
                .<br /> Multix will take care of wrapping it in a multisig/proxy call
            </AlertStyled>
            {isProxyProxyRemoved && (
                <AlertStyled severity="warning">
                    Multix will override the proxy.proxy call with the proxy you have selected
                </AlertStyled>
            )}
            <TextField
                data-cy="input-from-call-data"
                label={`Call data`}
                onChange={onCallDataChange}
                value={pastedCallData || ''}
                helperText={callDataError}
                error={!!callDataError}
                fullWidth
            />
            {!!callInfo && !!pastedCallInfo && !callDataError && (
                <CallInfo
                    aggregatedData={{
                        decodedCall: callInfo.call?.decodedCall,
                        callData: callDataToUse,
                        name: getExtrinsicName(callInfo.section, callInfo.method),
                    }}
                    expanded
                    withProxyFiltered={false}
                    isPplChainTx={false}
                />
            )}
        </Box>
    );
};

const AlertStyled = styled(Alert)`
    margin: 0.5rem 0 0.5rem 0;
`;
export default FromCallData;
