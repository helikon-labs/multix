import { InjectedAccountWitMnemonic } from './testAccounts';

const signatory = {
    address: '5CPG8FMciJBBE47YwSQHte23tTz91egixJw514g6BCt5nHPz',
    publicKey: '0x0e270b0984354e0f6033dee93293dbeaea366220ca59e584ba7614d8bf393040',
    name: 'hidden',
    type: 'sr25519',
    mnemonic: '',
} as InjectedAccountWitMnemonic;

const leemo = {
    address: '1HGnvAkk9nbfZ58CzUJhjcrLdEDMkr5qNkqqYkyD5BF5v6Y',
    publicKey: '0x0c691601793de060491dab143dfae19f5f6413d4ce4c363637e5ceacb2836a4e',
    name: 'hidden',
    type: 'sr25519',
    mnemonic: '',
} as InjectedAccountWitMnemonic;

export const westendMemberAccount = {
    // this is the member of a multisig and a multisig with Pure
    // used in hidden-accounts
    hidden: {
        account: signatory,
        expectedSingleMultisig: {
            westendAddress: '5CvCLBVHufgqTDUVJL3xY6Pd7TVaYtaTGzvYRfGeaAPJLdDS',
            paseoAddress: '1rVUWkMmSxJtkV1Fy6xgFDmy5VEFC8bMVf2axG18FQpX7hE',
            pubKey: '0x25bee0c82d1a5ea1ef4f75b4cb517286a78ed51ab934b1636ac4d8b018811b1b',
        },
        expectedPure: {
            address: '5DqS9vsnXotmczKu87xb5KMUARCVF5JUUVveZz9R8UvXKExK',
            pubKey: '0x4e596aec4922957174ba3f86860cca88fa4664006b511f11260cc34ca303d0dd',
        },
    },
    // this one has no identity
    // but it has a pending identity tx
    noIdentity: {
        account: signatory,
        expectedSingleMultisig: {
            westendAddress: '5GAvk9wqjHmXxCJB5UtwghLK4UqDzSD4sduSHwfoqhhYwoRS',
            pubKey: '0xb5afca4314341bd1048c572e2e358fa00cb02387689a91f20688b9f49f3e64c6',
        },
    },
    polkadotMultisigNoIdentity: {
        account: leemo,
        // CD event bounty
        expectedPure: {
            address: '13DxmMjYqto1AWsMUSkN8JYNHX6d2vBhuSmapB5iYnEiYaxX',
            pubkey: '0x625b21fc3cfe39c52cf4d753fe8ad5f3b2ace458d9d11d266f080216e5e885e6',
        },
    },
    // a random multisig on westend with a pending ppl chain tx
    pendingIdentityTx: {
        expectedSingleMultisig: {
            westendAddress: '5DZWSw94BYkPVYF1RgMT261deXgPkeGYw9dQYmXsNSeRbxvs',
            pubKey: '0x4233f17e78d624edb78296e918a631d3ceaa468167a9be7b16d612e446dd5c0d',
        },
    },
};
