import { encodesubstrateAddress } from './encodeSubstrateAddress';
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer';

export function encodeAccounts(accounts: string[], ss58Format: number): string[];
export function encodeAccounts(
    accounts: InjectedPolkadotAccount[],
    ss58Format: number,
): InjectedPolkadotAccount[];
export function encodeAccounts(accounts: unknown[], ss58Format: number): unknown[] {
    if (!accounts || accounts.length === 0) return [];

    if (typeof accounts[0] === 'string') {
        return (accounts as string[])
            .map((account) => encodesubstrateAddress(account, ss58Format))
            .filter(Boolean) as string[];
    }

    return (accounts as InjectedPolkadotAccount[])
        .map((account) => {
            const addressToEncode = account.address;

            const encodedAddress = encodesubstrateAddress(addressToEncode, ss58Format);

            if (!encodedAddress) {
                return null;
            }

            return {
                ...account,
                address: encodedAddress,
            } as InjectedPolkadotAccount;
        })
        .filter(Boolean) as InjectedPolkadotAccount[];
}
