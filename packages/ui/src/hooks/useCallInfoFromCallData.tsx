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
        if (!callData) {
            setCallInfo(undefined);
            setIsGettingCallInfo(false);
            return;
        }

        if (!api || !compatibilityToken) {
            setCallInfo(undefined);
            setIsGettingCallInfo(false);
            return;
        }

        setIsGettingCallInfo(true);

        try {
            const tx = api.txFromCallData(Binary.fromHex(callData), compatibilityToken);

            tx.getPaymentInfo(PAYMENT_INFO_ACCOUNT, { at: 'best' })
                .then(({ weight, partial_fee }) => {
                    setCallInfo({
                        decodedCall: tx?.decodedCall,
                        call: tx,
                        hash: hashFromTx(callData),
                        weight,
                        section: tx?.decodedCall.type,
                        method: tx?.decodedCall.value.type,
                        partialFee: partial_fee,
                    });
                    setIsGettingCallInfo(false);
                })
                .catch((e) => {
                    console.error(e);
                    setIsGettingCallInfo(false);
                    setCallInfo(undefined);
                });
        } catch (e) {
            console.error(e);
            setIsGettingCallInfo(false);
            setCallInfo(undefined);
        }
    }, [api, callData, compatibilityToken]);

    return { callInfo, isGettingCallInfo };
};
