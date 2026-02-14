import { InjectedAccountWitMnemonic } from './testAccounts';

export const expectedMultisigAddress = '1ZJA1iLT5dei9XB9myMJYyw4d24aCfiniHBxQJPWsvCUoV9';

export const extrinsicsDisplayAccounts = {
    // it has no token but is part of a multisig
    Alice: {
        address: '15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5',
        publicKey: '0xb4b72576a091c5d691c2fd37f6eaa3d51c7480c2baaeab48737e5a209db4a431',
        name: 'Alice',
        type: 'sr25519',
        mnemonic: 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice',
    } as InjectedAccountWitMnemonic,
};
