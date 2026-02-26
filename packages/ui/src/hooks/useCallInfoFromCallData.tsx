import { useEffect, useState } from 'react';
import { SubmittingCall } from '../types';
import { PAYMENT_INFO_ACCOUNT } from '../constants';
import { Binary, HexString } from 'polkadot-api';
import { hashFromTx } from '../utils/txHash';
import { useAnyApi } from './useAnyApi';

export const useCallInfoFromCallData = ({
    isPplTx,
    callData,
}: {
    isPplTx: boolean;
    callData?: HexString;
}) => {
    const { api, compatibilityToken } = useAnyApi({ withPplApi: isPplTx });
    const [callInfo, setCallInfo] = useState<SubmittingCall | undefined>(undefined);
    const [isGettingCallInfo, setIsGettingCallInfo] = useState(false);

    useEffect(() => {
        (async () => {
            if (!callData || !api || !compatibilityToken) {
                setCallInfo(undefined);
                setIsGettingCallInfo(false);
                return;
            }
            setIsGettingCallInfo(true);
            try {
                const tx = api.txFromCallData(Binary.fromHex(callData), compatibilityToken);
                const { weight, partial_fee } = await tx.getPaymentInfo(PAYMENT_INFO_ACCOUNT, {
                    at: 'best',
                });
                setCallInfo({
                    decodedCall: tx?.decodedCall,
                    call: tx,
                    hash: hashFromTx(callData),
                    weight,
                    section: tx?.decodedCall.type,
                    method: tx?.decodedCall.value.type,
                    partialFee: partial_fee,
                });
            } catch (e) {
                console.error(e);
            } finally {
                setIsGettingCallInfo(false);
            }
        })();
    }, [api, callData, compatibilityToken]);

    return { callInfo, isGettingCallInfo };
};
