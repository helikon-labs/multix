export const baseUrl = 'http://localhost:3333';
export const defaultNetwork = 'paseo';
const WATCH_ACCOUNT_ANCHOR = 'watched-accounts';
const HIDDEN_ACCOUNTS_ANCHOR = 'hidden-accounts';

export const landingPageNetwork = (networkName: string) => `${baseUrl}?network=${networkName}`;
export const landingPageUrl = landingPageNetwork(defaultNetwork);
export const getSettingsPageUrl = (network = defaultNetwork) =>
    `${baseUrl}/settings?network=${network}`;
export const getSettingsPageWatchAccountUrl = (network = defaultNetwork) =>
    `${getSettingsPageUrl(network)}#${WATCH_ACCOUNT_ANCHOR}`;
export const getSettingsPageHiddenAccountUrl = (network = defaultNetwork) =>
    `${getSettingsPageUrl(network)}#${HIDDEN_ACCOUNTS_ANCHOR}`;
export const landingPageNetworkAddress = ({
    network,
    address,
}: {
    network: string;
    address: string;
}) => `${landingPageNetwork(network)}&address=${address}`;
export const landingPageAddressUrl = (address: string) =>
    landingPageNetworkAddress({ network: defaultNetwork, address });
