export function renderMultisigHeading(hasSeveralMultisigs: boolean | undefined): string {
    return hasSeveralMultisigs ? 'Multisigs' : 'Multisig';
}
