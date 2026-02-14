// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getOriginAccount(origin: any): string {
    if (origin && origin.__kind === 'system' && origin.value.__kind === 'Signed') {
        const id = origin.value.value;
        if (id.__kind === 'Id') {
            return id.value;
        } else {
            return id;
        }
    } else {
        throw new Error('Unexpected origin');
    }
}
