import { InjectedAccount } from 'polkadot-api/pjs-signer';

export interface InjectedAccountWitMnemonic extends InjectedAccount {
    mnemonic: string;
    publicKey?: string;
}

export const testAccounts = {
    'Multisig Member Account 1': {
        address: '162QHxDDkYAmHWSASKExncfgBMVNSoVV3vwmAtu56zqMt1mJ',
        publicKey: '0xde3ed24acdfe71c13b4d42539c5390ddee147ba6b29b0593ce842e77ff034445',
        name: 'Multisig Member Account 1',
        type: 'sr25519',
        mnemonic: 'climb worth pioneer mushroom cloth expose tube high half final curtain toward',
    } as InjectedAccountWitMnemonic,
    'Multisig Member Account 2': {
        address: '158pLCAqaCUsZrRPeEK3HSTLDxPyaQ5LV6Nmibbxpib7iu4R',
        publicKey: '0xb6e6fb4f2a2268bf6e8a211d958cbf602881418bcc533216cadfae3e24785f28',
        name: 'Multisig Member Account 2',
        type: 'sr25519',
        mnemonic: 'divorce lottery slender again adapt process slow pigeon suit chase news begin',
    } as InjectedAccountWitMnemonic,
    'Multisig Member Account 3': {
        address: '14fm5WcyMvkVkEpTyEhFFgjDQRZspee5jfuX9QtsyNEuc9if',
        publicKey: '0xa244679c3186eb336beb3a8335e0a6f6ab0256618f0fcb0cbc493a14cfdc765d',
        name: 'Multisig Member Account 3',
        type: 'sr25519',
        mnemonic:
            'double smoke neglect nasty door atom general health doctor subject regret romance',
    } as InjectedAccountWitMnemonic,
    'Multisig Member Account 4': {
        address: '15a1VoMnixXyQnCf7nae89gkmbu5WMGZTniWiixxJD36NGLZ',
        publicKey: '0xca1db422d29bc27114e68e10e98f6ae6d5981ae412de2e21b8647b46a221ae53',
        name: 'Multisig Member Account 4',
        type: 'sr25519',
        mnemonic: 'prefer live muscle virtual embrace arm stone museum weasel escape ten float',
    } as InjectedAccountWitMnemonic,
    'Multisig Member Account 5': {
        address: '1t8g1ZXypq36LpGCDG5nbiW42chjTScGPhAVBiejZFU5A5s',
        publicKey: '0x26ff58054d290e16efedc0e9be37d9197791d50ad071c1a9bff12eda2737992a',
        name: 'Multisig Member Account 5',
        type: 'sr25519',
        mnemonic: 'hunt pause dawn identify month ahead ship ribbon brother fit fabric fabric',
    } as InjectedAccountWitMnemonic,
    'Multisig Member Account 6': {
        address: '133zs4z4iNBvWhHEQ1PJDraBgXtwFdiX3W8y43bghXQ67Ywn',
        publicKey: '0x5ac1be27611275d1dc40cf345d7bf3355c7ece3f5914f04051dc23c6f3f8e570',
        name: 'Multisig Member Account 6',
        type: 'sr25519',
        mnemonic: 'hunt pause dawn identify month ahead ship ribbon brother fit fabric fabric/1',
    } as InjectedAccountWitMnemonic,

    'Non Multisig Member 1': {
        address: '13ixUNRoNQ2NL57Us7tfQ2VtUDxVhdPn4y3md4gUAbsjW8PS',
        publicKey: '0x78784374dbeba13ff9789fca0e46c4960e219a1fff11ea69d6f0b57a7f3bfb61',
        name: 'Non Multisig Member 1',
        type: 'sr25519',
        mnemonic:
            'consider hockey practice evolve stool jaguar follow sponsor party trial view entry',
    } as InjectedAccountWitMnemonic,
    'Non Multisig Member 2': {
        address: '5G9et86FAJ48fPgkHytVwdpHi9mCLKPpyT5fo1HGtRN9ZwKP',
        publicKey: '0xb4b72576a091c5d691c2fd37f6eaa3d51c7480c2baaeab48737e5a209db4a431',
        name: 'Non Multisig Member 2',
        type: 'sr25519',
        mnemonic: 'erosion never fee pill vocal fetch enforce soap betray zero answer hollow',
    } as InjectedAccountWitMnemonic,
    'Funded Account 1 Chopsticks Kusama': {
        address: 'JEqfw2FPda5eycsqqXN2Ay67eEh5R85aSHcArs3XdUYjj5H',
        publicKey: '0xfa8e003cb5d22db1e8658e05245c3bab0851e516b71a8256bc3edf006b817161',
        name: 'Funded Account 1 Chopsticks',
        type: 'sr25519',
        mnemonic:
            'bottom drive obey lake curtain smoke basket hold race lonely fit walk//chopsticks/1',
    } as InjectedAccountWitMnemonic,
    'Funded Account 2 Chopsticks Kusama': {
        address: 'JF3RaX21TrQuPrRbEV7i1iT5QXNQZBN6qvKx3iZN8CEN9bB',
        publicKey: '0xfab5903e86cb55051903d16a94bdd454f8db9e377d79dd6d420dfe9734d00c4f',
        name: 'Funded Account 2 Chopsticks',
        type: 'sr25519',
        mnemonic:
            'bottom drive obey lake curtain smoke basket hold race lonely fit walk//chopsticks/2',
    } as InjectedAccountWitMnemonic,
    'Funded Account 3 Chopsticks Kusama': {
        address: 'HxehWqUZGorCrahv3PiWWqdcFNBG9oQhZ2ft5VXueWaSBEs',
        publicKey: '0xee35231494a285e552ba4592c8e32ac42192f3bb3443618f8e62ecc896f0e749',
        name: 'Funded Account 3 Chopsticks',
        type: 'sr25519',
        mnemonic:
            'bottom drive obey lake curtain smoke basket hold race lonely fit walk//chopsticks/3',
    } as InjectedAccountWitMnemonic,
    'Not Funded Account 4 Chopsticks Kusama': {
        address: 'FtumrS4fFxcUL3UW5mxJ5ispXS4ADpGo3bas5ouQKbjxVZG',
        publicKey: '0x92e26f4dab1f112580136d3f0287207900a7ed74d9d1211b4062110599bf2930',
        name: 'Not Funded Account 4 Chopsticks',
        type: 'sr25519',
        mnemonic:
            'bottom drive obey lake curtain smoke basket hold race lonely fit walk//chopsticks/4',
    } as InjectedAccountWitMnemonic,
};
