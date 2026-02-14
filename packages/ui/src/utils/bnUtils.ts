const DEFAULT_BITLENGTH = 32 as BitLength;

export type BitLength = 8 | 16 | 32 | 64 | 128 | 256;

export function getGlobalMaxValue(bitLength?: number): bigint {
    return 2n ** BigInt(bitLength || DEFAULT_BITLENGTH) - 1n;
}

export function isValidNumber(
    bn: bigint,
    bitLength: BitLength,
    isSigned: boolean,
    isZeroable: boolean,
    maxValue?: bigint | null,
): boolean {
    if (
        // cannot be negative
        (!isSigned && bn < 0n) ||
        // cannot be > than allowed max
        bn > getGlobalMaxValue(bitLength) ||
        // check if 0 and it should be a value
        (!isZeroable && bn === 0n) ||
        // check that the bitlengths fit
        bn.toString(2).length > (bitLength || DEFAULT_BITLENGTH) ||
        // cannot be > max (if specified)
        (maxValue && maxValue > 0n && bn > maxValue)
    ) {
        return false;
    }

    return true;
}

export function inputToBigInt(chainDecimals: number, input: string, isSigned = false) {
    const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);
    let result;

    if (isDecimalValue) {
        const div = BigInt(input.replace(/\.\d*$/, ''));
        const modString = input.replace(/^\d+\./, '').substring(0, chainDecimals);
        const mod = BigInt(modString);

        result =
            div * 10n ** BigInt(chainDecimals) +
            mod * 10n ** BigInt(chainDecimals - modString.length);
    } else {
        result =
            BigInt(input.replace(/[^\d]/g, '')) *
            10n ** BigInt(chainDecimals) *
            (isSigned && input.startsWith('-') ? -1n : 1n);
    }

    return result;
}

export const bigIntMax = (a: bigint, b: bigint) => (a > b ? a : b);
