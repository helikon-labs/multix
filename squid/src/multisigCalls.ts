import { Call } from '@subsquid/substrate-processor';

// "args": {
//     "call": {
//         "__kind": "Proxy",
//         "value": {
//             "__kind": "create_pure",
//             "delay": 0,
//             "index": 0,
//             "proxyType": {
//                 "__kind": "Any"
//             }
//         }
//     },
//     "maxWeight": {
//         "proofSize": "0",
//         "refTime": "182470554"
//     },
//     "maybeTimepoint": {
//         "height": 3152562,
//         "index": 2
//     },
//     "otherSignatories": [
//         "0x4e66461fed55e8de6988270d17e18f29a5c3fb0fc6ca39f9a9f41bff01510665",
//         "0x7c6bb0cfc976a5a68c6493c963ac05427423d37d4a21f3d5a589bbe0756b3b59"
//     ],
//     "threshold": 2
// },

export const handleMultisigCall = (multisigArgs: Call['args']) => {
    return {
        otherSignatories: multisigArgs['otherSignatories'],
        threshold: multisigArgs['threshold'],
    };
};
