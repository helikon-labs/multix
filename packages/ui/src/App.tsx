import './styles/App.css';
import { CssBaseline } from '@mui/material';
import { AccountContextProvider } from './contexts/AccountsContext';
import { ApiContextProvider } from './contexts/ApiContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MultiProxyContextProvider } from './contexts/MultiProxyContext';
import ToastContextProvider from './contexts/ToastContext';
import { theme } from './styles/theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AccountNamesContextProvider } from './contexts/AccountNamesContext';
import { NetworkContextProvider } from './contexts/NetworkContext';
import MainLayout from './components/layout/Main';
import { WatchedAccountsContextProvider } from './contexts/WatchedAccountsContext';
import { WalletConnectContextProvider } from './contexts/WalletConnectContext';
import { ModalsContextProvider } from './contexts/ModalsContext';
import { PplApiContextProvider } from './contexts/PeopleChainApiContext';
import { ReactiveDotProvider } from '@reactive-dot/react';
import { config } from './walletConfigs';
import { Suspense } from 'react';
import { AssetsContextProvider } from './contexts/AssetsContext';
import { HiddenAccountsContextProvider } from './contexts/HiddenAccountsContext';
import { PendingTxsContextProvider } from './contexts/PendingTxContext';

const App = () => {
    const queryClient = new QueryClient();

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ReactiveDotProvider config={config}>
                <Suspense fallback={<div> Loading...</div>}>
                    <ToastContextProvider>
                        <NetworkContextProvider>
                            <QueryClientProvider client={queryClient}>
                                <ApiContextProvider>
                                    <PplApiContextProvider>
                                        <AssetsContextProvider>
                                            <WatchedAccountsContextProvider>
                                                <HiddenAccountsContextProvider>
                                                    <AccountContextProvider>
                                                        <AccountNamesContextProvider>
                                                            <MultiProxyContextProvider>
                                                                <WalletConnectContextProvider>
                                                                    <PendingTxsContextProvider>
                                                                        <ModalsContextProvider>
                                                                            <MainLayout />
                                                                        </ModalsContextProvider>
                                                                    </PendingTxsContextProvider>
                                                                </WalletConnectContextProvider>
                                                            </MultiProxyContextProvider>
                                                        </AccountNamesContextProvider>
                                                    </AccountContextProvider>
                                                </HiddenAccountsContextProvider>
                                            </WatchedAccountsContextProvider>
                                        </AssetsContextProvider>
                                    </PplApiContextProvider>
                                </ApiContextProvider>
                            </QueryClientProvider>
                        </NetworkContextProvider>
                    </ToastContextProvider>
                </Suspense>
            </ReactiveDotProvider>
        </MuiThemeProvider>
    );
};

export default App;
