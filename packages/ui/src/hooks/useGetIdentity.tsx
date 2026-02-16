import { useCallback } from 'react';
import { useIdentityApi } from './useIdentityApi';
import { FixedSizeBinary } from 'polkadot-api';
import {
    IdentityData,
    IdentityJudgement,
    DotPplQueries,
    AstarQueries,
} from '@polkadot-api/descriptors';
import { identityDescriptorKeys } from '../types';
import { isNativeIdentityContextIn } from '../contexts/NativeIdentityApiContext';
import { useHasIdentityFeature } from './useHasIdentityFeature';

export interface IdentityInfo extends Record<string, any> {
    judgements: IdentityJudgement['type'][];
    sub?: string;
}

export const useGetIdentity = () => {
    const { ctx } = useIdentityApi();
    const { hasPplChain, hasIdentityPallet } = useHasIdentityFeature();
    const getIdentity = useCallback(
        async (address: string) => {
            if (
                !ctx ||
                !address ||
                !(hasPplChain || hasIdentityPallet) ||
                !isNativeIdentityContextIn(ctx, identityDescriptorKeys) ||
                !ctx.nativeIdentityApi
            ) {
                return;
            }

            const { sub, parentAddress } =
                await ctx.nativeIdentityApi.query.Identity.SuperOf.getValue(address, {
                    at: 'best',
                }).then((res) => {
                    const [parentAddress, parentIdentity] = res || [];

                    if (!parentAddress || !parentIdentity) {
                        return { parentAddress: '', display: '' };
                    }

                    const sub =
                        parentIdentity.type !== 'None' && parentIdentity.value
                            ? (parentIdentity.value as FixedSizeBinary<3>).asText()
                            : '';

                    return { sub, parentAddress };
                });

            const addressToUse = parentAddress || address;

            const identity = await ctx.nativeIdentityApi.query.Identity.IdentityOf.getValue(
                addressToUse,
                {
                    at: 'best',
                },
            )
                .then((res) => {
                    const id: IdentityInfo = { judgements: [], sub };
                    type Identity =
                        | DotPplQueries['Identity']['IdentityOf']['Value']
                        | AstarQueries['Identity']['IdentityOf']['Value'];
                    let identity: Identity | undefined;

                    if (Array.isArray(res)) {
                        identity = res[0];
                    } else {
                        identity = res;
                    }

                    if (!identity) return;

                    identity.judgements.forEach(([, judgement]) => {
                        id.judgements.push(judgement.type);
                    });
                    Object.entries(identity.info || {}).forEach(([key, value]) => {
                        if ((value as IdentityData)?.type !== 'None') {
                            const text = (value as IdentityData)?.value as
                                | FixedSizeBinary<2>
                                | undefined;
                            if (text) {
                                id[key] = text.asText();
                            }
                        }
                    });

                    if (
                        id.judgements.length === 0 &&
                        id.sub === undefined &&
                        Object.keys(id).length === 2
                    ) {
                        // there's no identity
                        return undefined;
                    }

                    return id;
                })
                .catch((e) => {
                    console.error('Error getting identity');
                    console.error(e);
                    return undefined;
                });

            return identity;
        },
        [ctx, hasPplChain, hasIdentityPallet],
    );

    return getIdentity;
};
