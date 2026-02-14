export const wikiLinkReservedFunds =
    'https://github.com/Tbaut/Multix/wiki/Why-are-funds-reserved%3F';

export const getErrorMessageReservedFunds = ({
    identifier,
    requiredBalanceString,
    reservedString,
    withPpleChain,
}: {
    identifier: string;
    requiredBalanceString?: string;
    reservedString?: string;
    withPpleChain?: boolean;
}) => {
    if (!requiredBalanceString) return '';

    return (
        <span>
            The {identifier} doesn&apos;t have the required {requiredBalanceString}
            {withPpleChain ? ' on the People Chain' : ''} to submit this transaction.{' '}
            <ReservedMessage reservedAmount={reservedString} />
        </span>
    );
};

const ReservedMessage = ({ reservedAmount }: { reservedAmount?: string }) => {
    if (!reservedAmount) return null;

    return (
        <span>
            Note that it includes {reservedAmount} that will be reserved.{' '}
            <a
                href={wikiLinkReservedFunds}
                target="_blank"
                rel="noreferrer"
            >
                More info.
            </a>
        </span>
    );
};
