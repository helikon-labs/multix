import { WalletAccount } from '@reactive-dot/core/wallets.js';
import { encodesubstrateAddress } from './encodeSubstrateAddress';

export function encodeAccounts(accounts: string[], ss58Format: number): string[];
export function encodeAccounts(accounts: WalletAccount[], ss58Format: number): WalletAccount[];
export function encodeAccounts(accounts: unknown[], ss58Format: number): unknown[] {
    if (!accounts || accounts.length === 0) return [];

    if (typeof accounts[0] === 'string') {
        return (accounts as string[])
            .map((account) => encodesubstrateAddress(account, ss58Format))
            .filter(Boolean) as string[];
    }

    return (accounts as WalletAccount[])
        .map((account) => {
            const addressToEncode = account.address;

            const encodedAddress = encodesubstrateAddress(addressToEncode, ss58Format);

            if (!encodedAddress) {
                return null;
            }

            return {
                ...account,
                address: encodedAddress,
            } as WalletAccount;
        })
        .filter(Boolean) as WalletAccount[];
}
