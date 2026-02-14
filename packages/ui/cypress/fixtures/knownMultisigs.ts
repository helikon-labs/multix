import { testAccounts } from './testAccounts';

export const knownMultisigs = {
    // this multisig is doing transactions and
    // has logic to remove the pending tx
    'test-simple-multisig-1': {
        address: '1iEzHCQ6XWNKJBfdtdTSn2pmUygkGXpknXR6aZcsyxHaped',
        publicKey: '0x1f7425dfe88e50fbef6826d117bb06c9d7d672b6ddfc1d578c581c7359beeb52',
        threshold: 2,
        signatories: [
            testAccounts['Multisig Member Account 1'].address,
            testAccounts['Multisig Member Account 2'].address,
        ],
    },
    'multisig-with-pure': {
        name: 'Multisig With Pure',
        address: '1gkDr5CdZZ6BodjWkVTgALLH75vVKU1SSSgibBC7UPMXS3A',
        pureAddress: '161hfudUKvdgBMRzHviDGm6MZM55VoyA1thjnUFN12fYD7Jv',
        purePublicKey: '0xddb613d315b4a0bb1aeb28fb256cc28d41f4704cc92191faae0881ebf99412d4',
        threshold: 2,
        signatories: [
            testAccounts['Multisig Member Account 1'].address,
            testAccounts['Multisig Member Account 2'].address,
            testAccounts['Multisig Member Account 3'].address,
        ],
    },
    // this multisig has 2 unkown tx that should
    // not be removed
    // it needs to have unique users never used in any other multisig
    'multisigs-unique-users': {
        name: 'Unique multisig',
        address: '1MJF5WZd31i3vvsLmvgVx4uN1y9AqAGrCXhjnNThxPUVbM1',
        publicKey: '0x0f7af3c714b7cb4b0365aca43c586371bb10560b770f53f20a2dddad8db1365d',
        threshold: 2,
        hashOfUknownCall: '0x15d556c6576d26ff46f46ce9032d4a2a2107ceb2974a7bfc84124faa36d5cee7',
        callData: '0x0000286d756c74697820667477',
        signatories: [
            testAccounts['Multisig Member Account 4'].address,
            testAccounts['Multisig Member Account 5'].address,
        ],
    },
    'watched-multisig-with-pure': {
        name: 'Multisig With Pure',
        address: '12sRk3vQ8CQb8HjXwBpp22QBT8ep6L9x919evDrwZXbsvaYi',
        publicKey: '0x52b1cb22ddaf992455d8a0bec7f7aec86095715292f08f55fcd28b178b2de545',
        pureAddress: '13RLuy3muymPYb8JR3Yqyy5uYP2fuA3WvKiZtCLo2XfcGj5Z',
        purePublicKey: '0x6b0963f535d131f0fbf49a064b91f27d6106cf1522a93669e0d45175481665a3',
        threshold: 2,
        signatories: [
            '13EUU9775dB3Cai7fuR92UitxW4gZ3erzjcPFqyn3BUXWRtL',
            '16Am9gucwcbW92W4P7Y8gqXvNb3U98KGWBsg4zkBUyfePfn4',
        ],
    },
};
