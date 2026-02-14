import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccountBadge } from '../types';
import AccountDisplay from './AccountDisplay/AccountDisplay';
import Expander from './Expander';
import { useMultisigByIdQuery } from '../../types-and-hooks';
import { useEffect, useState } from 'react';
import { useAccountId } from '../hooks/useAccountId';
import { useGetEncodedAddress } from '../hooks/useGetEncodedAddress';
import { getPubKeyFromAddress } from '../utils/getPubKeyFromAddress';

interface Props {
    address: string;
    className?: string;
    expanded?: boolean;
}

const MultisigCompactDisplay = ({ className, address, expanded = false }: Props) => {
    const [signatories, setSignatories] = useState<string[]>([]);
    const accountId = useAccountId(getPubKeyFromAddress(address) || '');
    const getEncodedAddress = useGetEncodedAddress();
    const { data, error, isFetching } = useMultisigByIdQuery({ id: accountId });
    const [badge, setBadge] = useState<AccountBadge | undefined>();
    const [threshold, setThreshold] = useState<number | null | undefined>(null);

    useEffect(() => {
        !!error && console.error(error);
    }, [error]);

    useEffect(() => {
        if (!!error || isFetching) {
            return;
        }

        if (data?.accounts[0]) {
            // this is a query by id, so it should return just 1 account
            setSignatories(
                data.accounts[0].signatories.map(
                    ({ signatory }) => getEncodedAddress(signatory.pubKey) || '',
                ),
            );
            setThreshold(data.accounts[0].threshold);
            setBadge(AccountBadge.MULTI);
        }
    }, [data, error, getEncodedAddress, isFetching]);

    return (
        <Box className={className}>
            <AccountDisplayStyled
                isMultisig={signatories.length > 0}
                address={address}
                badge={badge}
                canCopy
            />
            {signatories.length > 0 && (
                <Expander
                    expanded={expanded}
                    title={
                        <div>
                            Signatories{' '}
                            <Chip
                                className="threshold"
                                label={`${threshold}/${signatories.length}`}
                            />
                        </div>
                    }
                    content={
                        <ul className="signatoryList">
                            {signatories.map((sig) => (
                                <li key={sig}>
                                    <AccountDisplay
                                        address={sig}
                                        canCopy
                                    />
                                </li>
                            ))}
                        </ul>
                    }
                />
            )}
        </Box>
    );
};

export default styled(MultisigCompactDisplay)`
    .signatoryList {
        list-style-type: none;
    }
`;

const AccountDisplayStyled = styled(AccountDisplay)<{ isMultisig: boolean }>(
    ({ isMultisig }) => `
      ${isMultisig && 'margin: 0.5rem 0 0 0.5rem'};
`,
);
