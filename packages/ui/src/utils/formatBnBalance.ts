interface Options {
    numberAfterComma?: number;
    withThousandDelimiter?: boolean;
    tokenSymbol?: string;
}

function removeTrailingZeros(value: string) {
    return value.replace(/0+$/, '');
}

function countLeadingZeros(numberString: string): number {
    const match = numberString.match(/^0+/);
    return match ? match[0].length : 0;
}

export const formatBigIntBalance = (
    value: bigint | string,
    tokenDecimals = 0,
    { numberAfterComma = 4, withThousandDelimiter = true, tokenSymbol }: Options,
): string => {
    const valueString = value.toString();

    let suffix = '';
    let prefix = '';

    if (valueString.length > tokenDecimals) {
        suffix = valueString.slice(-tokenDecimals);
        prefix = valueString.slice(0, valueString.length - tokenDecimals);
    } else {
        prefix = '0';
        suffix = valueString.padStart(tokenDecimals, '0');
    }

    suffix = removeTrailingZeros(suffix);
    let comma = '.';
    const countLeadingZerosSuffix = countLeadingZeros(suffix);
    const numberAfterCommaLtZero = numberAfterComma && numberAfterComma < 0;

    if (numberAfterCommaLtZero || numberAfterComma === 0 || suffix === '') {
        comma = '';
        suffix = '';
    } else if (countLeadingZerosSuffix > 0) {
        suffix = suffix.slice(0, numberAfterComma + countLeadingZerosSuffix);
    } else if (numberAfterComma && numberAfterComma > 0) {
        suffix = suffix.slice(0, numberAfterComma);
    }

    if (withThousandDelimiter) {
        prefix = prefix.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const unit = tokenSymbol ? ` ${tokenSymbol}` : '';

    return `${prefix}${comma}${suffix}${unit}`;
};
