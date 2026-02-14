// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JsonLog = (val: any): string => {
    return JSON.stringify(
        val,
        (_, value) => (typeof value === 'bigint' ? value.toString() : value),
        4,
    );
};
