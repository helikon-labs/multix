import { MultiProxy } from '../contexts/MultiProxyContext';

export function getMultiProxyAddress(multi: undefined): undefined;
export function getMultiProxyAddress(multi: MultiProxy): string;
export function getMultiProxyAddress(multi?: MultiProxy): string | undefined;
export function getMultiProxyAddress(multi?: MultiProxy) {
    if (!multi) return;

    return multi.proxy || multi.multisigs[0].address;
}
