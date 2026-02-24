import { InjectedAccountWitMnemonic } from './testAccounts';

export const expectedPolkadotAHMultisigAddress = '1252HJVQDDtufVV7b2gdyBMe7yR4DHU6akSAyze9GENDZjeN';

export const polkadotAHMemberAccount = {
    MS_TEST_01: {
        address: '14TUPnbekKmfWPgsJCvL2Go2ZNkcNCBVmzNEF6BjkDM9PXc6',
        publicKey: '0x98e54b21348363b5df2236554dc18c165d35ee02328c6be8ff5ba6c74134af08',
        name: 'MS TEST 01',
        type: 'sr25519',
        mnemonic: '',
    } as InjectedAccountWitMnemonic,
    MS_TEST_02: {
        address: '16Zi18uVYZdZtPY5kPth3TXz4aR7NtRAo7akFjrWn7mSk1zo',
        publicKey: '0xf61f0be20cc565ca6d02e114dbd0e058187a402ae0a86a80e76f8d06e061fe58',
        name: 'MS TEST 02',
        type: 'sr25519',
        mnemonic: '',
    } as InjectedAccountWitMnemonic,
};
