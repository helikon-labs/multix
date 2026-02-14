import { InjectedAccountWitMnemonic } from './testAccounts';

export const expectedPolkadotMultisigAddressClow =
    '12niVg1BaFNjWDgtsneoiUQqZ1KB6YBGG68JLrNomYScckrQ';

export const polkadotMemberAccount = {
    // this is the member of a multisig on Polkadot
    Clow: {
        address: '15BERoWxrWC61cAb4JjpUdM7sy8FAS9uduismDbZ7PURZLto',
        publicKey: '0xb8be96d986897797d117987e4368640ffdf32bc967ba7467d012136c22dca33c',
        name: 'Clow',
        type: 'sr25519',
        mnemonic: '',
    } as InjectedAccountWitMnemonic,
    // this is a pure on Polkadot
    CultureDot: {
        address: '158sHoKeq7ZesHMLcp2MkxFQpd7caEW6Rcy1md3AK1fuX8ak',
        publicKey: '0xb6f0f10eec993f3e6806eb6cc4d2f13d5f5a90a17b855a7bf9847a87e07ee322',
        name: 'CultureDot',
        type: 'sr25519',
        mnemonic: '',
    } as InjectedAccountWitMnemonic,
    // this is a pure on Polkadot
    unknown: {
        address: '12QZUSm3c2HMjKFDdsY5XVT4gTJeUCiupRA5zUaQmSmnhToK',
        publicKey: '0x3e3431343e95883c170859a65d5c00e5bf15113ff92b57ea7a2adbf6cdf90629',
        name: 'unknown',
        type: 'sr25519',
        mnemonic: '',
    },
};
