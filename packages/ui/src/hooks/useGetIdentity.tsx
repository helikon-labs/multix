import { useCallback } from 'react';
import { useIdentityApi } from './useIdentityApi';
import { FixedSizeBinary } from 'polkadot-api';
import { IdentityData, IdentityJudgement, WesPplQueries } from '@polkadot-api/descriptors';
import { pplDescriptorKeys } from '../types';
import { isPplContextIn } from '../contexts/PeopleChainApiContext';

export interface IdentityInfo extends Record<string, any> {
    judgements: IdentityJudgement['type'][];
    sub?: string;
}

export const useGetIdentity = () => {
    const { ctx } = useIdentityApi();
    const getIdentity = useCallback(
        async (address: string) => {
            if (!ctx || !address || !isPplContextIn(ctx, pplDescriptorKeys)) {
                return;
            }

            if (!ctx.pplApi) return;

            const { sub, parentAddress } = await ctx.pplApi.query.Identity.SuperOf.getValue(
                address,
                {
                    at: 'best',
                },
            ).then((res) => {
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

            const identity = await ctx.pplApi.query.Identity.IdentityOf.getValue(addressToUse, {
                at: 'best',
            })
                .then((res) => {
                    const id: IdentityInfo = { judgements: [], sub };
                    let val: WesPplQueries['Identity']['IdentityOf']['Value'] | undefined;

                    if (Array.isArray(res)) {
                        val = res[0];
                    } else {
                        val = res;
                    }

                    if (!val) return;

                    val.judgements.forEach(([, judgement]) => {
                        id.judgements.push(judgement.type);
                    });
                    Object.entries(val.info || {}).forEach(([key, value]) => {
                        if ((value as IdentityData)?.type !== 'None') {
                            // console.log('key', JSONprint(key));
                            // console.log('value', JSONprint(value));
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
        [ctx],
    );

    return getIdentity;
};
