import { Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '../library';
import { IdentityInfo, useGetIdentity } from '../../hooks/useGetIdentity';
import { useCheckTransferableBalance } from '../../hooks/useCheckTransferableBalance';
import { getErrorMessageReservedFunds } from '../../utils/getErrorMessageReservedFunds';
import { useSetIdentityReservedFunds } from '../../hooks/useSetIdentityReservedFunds';
import { FixedSizeBinary, Transaction } from 'polkadot-api';
import { formatBigIntBalance } from '../../utils/formatBnBalance';
import { usePplApi } from '../../contexts/PeopleChainApiContext';
import { IdentityData } from '@polkadot-api/descriptors';
import { useGetED } from '../../hooks/useGetED';
import { TeleportFundsAlert } from '../TeleportFundsAlert';

interface Props {
    className?: string;
    from: string;
    onSetExtrinsic: (ext?: Transaction<any, any, any, any>) => void;
    onSetErrorMessage: React.Dispatch<React.SetStateAction<string | ReactNode>>;
}

export type IdentityFields = {
    display: string | undefined;
    legal: string | undefined;
    web: string | undefined;
    matrix: string | undefined;
    email: string | undefined;
    twitter: string | undefined;
};

const getRawFromValue = (value: string) => `Raw${value.length}`;

const getRawOrNone = (value?: string) => {
    return (
        value
            ? { type: getRawFromValue(value), value: FixedSizeBinary.fromText(value) }
            : { type: 'None' }
    ) as IdentityData;
};

const getExtrinsicsArgs = ({ legal, display, email, matrix, twitter, web }: IdentityFields) => {
    return {
        info: {
            display: getRawOrNone(display),
            legal: getRawOrNone(legal),
            web: getRawOrNone(web),
            matrix: getRawOrNone(matrix),
            email: getRawOrNone(email),
            twitter: getRawOrNone(twitter),
            pgp_fingerprint: undefined,
            image: getRawOrNone(),
            github: getRawOrNone(),
            discord: getRawOrNone(),
        },
    };
};

export const fieldNameAndPlaceholder = (fieldName: keyof IdentityFields) => {
    switch (fieldName) {
        case 'display':
            return {
                field: 'Display name',
                placeholder: 'Luke',
                required: true,
            };

        case 'legal':
            return {
                field: 'Legal name',
                placeholder: 'Luke Skylwalker',
                required: false,
            };

        case 'matrix':
            return {
                field: 'Matrix handle',
                placeholder: '@luke:matrix.org',
                required: false,
            };

        case 'web':
            return {
                field: 'Website',
                placeholder: 'https://luke.sky',
                required: false,
            };

        case 'twitter':
            return {
                field: 'Twitter/X handle',
                placeholder: '@luke',
                required: false,
            };

        case 'email':
            return {
                field: 'Email',
                placeholder: 'hello@luke.sky',
                required: false,
            };

        default:
            return {
                field: fieldName,
                placeholder: '',
                required: false,
            };
    }
};

const MAX_ALLOWED_VAL_LENGTH = 32;

const SetIdentity = ({ className, onSetExtrinsic, from, onSetErrorMessage }: Props) => {
    const {
        pplApi: api,
        pplChainInfo: chainInfo,
        pplCompatibilityToken: compatibilityToken,
    } = usePplApi();
    const [identityFields, setIdentityFields] = useState<IdentityFields | undefined>();
    const getIdentity = useGetIdentity();
    const [chainIdentity, setChainIdentity] = useState<IdentityInfo>();
    const [hasChangedAtLeastAField, setHasChangedAtLeastAField] = useState(false);
    const allFieldsUndefined = useMemo(() => {
        return !Object.values(identityFields || {}).some((field) => field !== undefined);
    }, [identityFields]);
    const fieldtooLongError = useMemo(() => {
        const res: (keyof IdentityFields)[] = [];
        identityFields &&
            Object.entries(identityFields).forEach(([field, value]) => {
                if (typeof value === 'string' && value.length >= MAX_ALLOWED_VAL_LENGTH) {
                    res.push(field as keyof IdentityFields);
                }
            });

        return res;
    }, [identityFields]);

    const { reserved: identityReservedFunds } = useSetIdentityReservedFunds(identityFields);
    const amountToSend = useMemo(() => {
        if (!api || !compatibilityToken) return 0n;
        // This is what we transfer to the ppl chain in case the sender doesn't have enough
        // to be safe, we send 10x the existential deposit to pay for fees + reserved funds
        return (
            10n * api.constants.Balances.ExistentialDeposit(compatibilityToken) +
            identityReservedFunds
        );
    }, [api, compatibilityToken, identityReservedFunds]);

    const { hasEnoughFreeBalance: hasMultisigEnoughPplFunds } = useCheckTransferableBalance({
        min: identityReservedFunds,
        address: from,
        withPplApi: true,
    });

    useEffect(() => {
        getIdentity(from).then(setChainIdentity).catch(console.error);
    }, [from, getIdentity]);

    const { existentialDeposit } = useGetED({
        withPplApi: true,
    });
    const minOriginBalanceDisplay = useMemo(() => {
        if (!existentialDeposit || !identityReservedFunds) return;

        return identityReservedFunds + existentialDeposit;
    }, [existentialDeposit, identityReservedFunds]);

    useEffect(() => {
        if (fieldtooLongError.length > 0) {
            onSetErrorMessage(`A field exceeds the ${MAX_ALLOWED_VAL_LENGTH} character limit`);
            return;
        }

        if (!identityFields?.display && hasChangedAtLeastAField) {
            onSetErrorMessage('Display name is required');
            return;
        }

        if (!!minOriginBalanceDisplay && !hasMultisigEnoughPplFunds) {
            const requiredBalanceString = formatBigIntBalance(
                minOriginBalanceDisplay,
                chainInfo?.tokenDecimals,
                {
                    tokenSymbol: chainInfo?.tokenSymbol,
                },
            );

            const reservedString = formatBigIntBalance(
                identityReservedFunds,
                chainInfo?.tokenDecimals,
                {
                    tokenSymbol: chainInfo?.tokenSymbol,
                },
            );

            const errorWithReservedFunds = getErrorMessageReservedFunds({
                identifier: '"From" account',
                requiredBalanceString,
                reservedString,
                withPpleChain: true,
            });

            onSetErrorMessage(errorWithReservedFunds);
            return;
        }

        onSetErrorMessage('');
    }, [
        chainInfo,
        fieldtooLongError,
        hasChangedAtLeastAField,
        hasMultisigEnoughPplFunds,
        identityFields,
        onSetErrorMessage,
        identityReservedFunds,
        minOriginBalanceDisplay,
    ]);

    useEffect(() => {
        if (chainIdentity) {
            const { display, email, legal, web, riot, twitter } = chainIdentity;
            setIdentityFields({
                display,
                legal,
                web,
                matrix: riot,
                email,
                twitter,
            });
        } else {
            setIdentityFields({
                display: undefined,
                legal: undefined,
                web: undefined,
                matrix: undefined,
                email: undefined,
                twitter: undefined,
            });
        }
    }, [chainIdentity]);

    useEffect(() => {
        if (!api) {
            onSetExtrinsic(undefined);
            return;
        }

        if (!identityFields || allFieldsUndefined) {
            onSetExtrinsic(undefined);
            return;
        }

        if (fieldtooLongError.length > 0) {
            onSetExtrinsic(undefined);
            return;
        }

        const extrinsicsArgs = getExtrinsicsArgs(identityFields);
        const call = api.tx.Identity.set_identity(extrinsicsArgs);
        onSetExtrinsic(call);
    }, [
        allFieldsUndefined,
        api,
        chainInfo,
        fieldtooLongError,
        identityFields,
        onSetErrorMessage,
        onSetExtrinsic,
    ]);

    const onChangeField = useCallback((field: keyof IdentityFields, value: string) => {
        setHasChangedAtLeastAField(true);
        setIdentityFields((prev) => (prev ? { ...prev, [field]: value } : undefined));
    }, []);

    return (
        <Grid
            className={className}
            container
            spacing={1}
            data-cy="section-set-identity"
        >
            {!!minOriginBalanceDisplay && !hasMultisigEnoughPplFunds && (
                <TeleportFundsAlert
                    receivingName="the multisig"
                    receivingAddress={from}
                    sendingAmount={amountToSend}
                    batchWithSignerIfNeeded={true}
                />
            )}
            {identityFields &&
                Object.entries(identityFields).map(([fieldName, value]) => {
                    const { field, placeholder, required } = fieldNameAndPlaceholder(
                        fieldName as keyof IdentityFields,
                    );
                    const isFieldError = fieldtooLongError.includes(
                        fieldName as keyof IdentityFields,
                    );
                    const isDiplayNameError =
                        fieldName === 'display' && !value && hasChangedAtLeastAField;
                    return (
                        <Grid
                            key={fieldName}
                            size={{ xs: 12, sm: 6, md: 6 }}
                            alignItems="center"
                        >
                            <TextFieldStyled
                                data-cy={`set-identity-field-${fieldName}`}
                                label={field}
                                placeholder={placeholder}
                                onChange={(val) =>
                                    onChangeField(
                                        fieldName as keyof IdentityFields,
                                        val.target.value,
                                    )
                                }
                                value={value || ''}
                                required={required}
                                helperText={
                                    isFieldError &&
                                    `Field has more than ${MAX_ALLOWED_VAL_LENGTH} chars`
                                }
                                error={isFieldError || isDiplayNameError}
                                slotProps={{
                                    htmlInput: {
                                        'data-cy': `input-set-identity-field-${fieldName}`,
                                    },
                                }}
                            />
                        </Grid>
                    );
                })}
        </Grid>
    );
};

const TextFieldStyled = styled(TextField)`
    .MuiFormHelperText-root.Mui-error {
        position: initial;
    }
`;

export default styled(SetIdentity)``;
