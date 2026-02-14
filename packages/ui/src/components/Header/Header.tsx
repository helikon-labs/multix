import { Box, IconButton, Toolbar } from '@mui/material';
import { Button, NavLink } from '../library';
import { styled } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import MultiProxySelection from '../select/MultiProxySelection';
import { useAccounts } from '../../contexts/AccountsContext';
import { HiOutlineWallet, HiOutlineBars3 as MenuIcon } from 'react-icons/hi2';
import { MENU_ROUTES } from '../../pages/routes';
import { isEmptyArray } from '../../utils/arrayUtils';
import NetworkSelection from '../select/NetworkSelection';
import multixLogo from '../../logos/multix-logo.svg';
import useWalletConnectEventsManager from '../../hooks/useWalletConnectEventsManager';
import { Link, createSearchParams, useSearchParams } from 'react-router';
import { useSwitchAddress } from '../../hooks/useSwitchAddress';
import { ConnectionDialog } from 'dot-connect/react.js';

interface Props {
    handleDrawerOpen: () => void;
}

const Header = ({ handleDrawerOpen }: Props) => {
    const {
        selectedAccount,
        ownAccountList,
        selectAccount,
        isConnectionDialogOpen,
        setIsConnectionDialogOpen,
        allowConnectionToExtension,
    } = useAccounts();
    const isAccountConnected = useMemo(() => !isEmptyArray(ownAccountList), [ownAccountList]);
    const [params] = useSearchParams();

    useWalletConnectEventsManager();
    useSwitchAddress();

    useEffect(() => {
        if (!selectedAccount?.address && ownAccountList.length > 0) {
            selectAccount(ownAccountList[0]);
            setIsConnectionDialogOpen(false);
        }
    }, [ownAccountList, selectAccount, selectedAccount?.address, setIsConnectionDialogOpen]);

    return (
        <>
            <MuiAppBarStyled position="sticky">
                <Toolbar>
                    <LogoWrapperStyled>
                        <HomeLinkStyled to="/">
                            <LogoStyled
                                src={multixLogo}
                                alt={`Multix logo`}
                            />
                        </HomeLinkStyled>
                    </LogoWrapperStyled>
                    <DesktopMenuStyled data-cy="menu-desktop">
                        <MenuWrapperStyled>
                            {MENU_ROUTES.map(({ path, name, isDisplayWhenNoWallet }) => {
                                const paramsString = createSearchParams(params).toString();

                                return isAccountConnected || isDisplayWhenNoWallet ? (
                                    <NavLink
                                        key={name}
                                        to={`${path}?${paramsString}`}
                                        data-cy={`button-navigate-${name.toLowerCase().replace(/ /g, '-')}`}
                                    >
                                        {name}
                                    </NavLink>
                                ) : null;
                            })}
                        </MenuWrapperStyled>
                        <RightButtonsWrapperStyled>
                            {ownAccountList.length === 0 && (
                                <ConnectButtonStyled
                                    data-cy="button-menu-connect"
                                    onClick={() => {
                                        setIsConnectionDialogOpen(true);
                                        allowConnectionToExtension();
                                    }}
                                    variant="primary"
                                >
                                    Connect
                                </ConnectButtonStyled>
                            )}
                            <MultiProxySelection testId="desktop" />
                            <NetworkSelectionStyled />
                            {ownAccountList.length > 0 && (
                                <IconButtonStyled
                                    data-cy="button-wallet"
                                    aria-label="wallet"
                                    onClick={() => setIsConnectionDialogOpen(true)}
                                >
                                    <HiOutlineWallet size={20} />
                                </IconButtonStyled>
                            )}
                        </RightButtonsWrapperStyled>
                    </DesktopMenuStyled>
                    <MobileIconButtonStyled
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </MobileIconButtonStyled>
                </Toolbar>
            </MuiAppBarStyled>
            {isConnectionDialogOpen && (
                <ConnectionDialog
                    data-cy="dialog-connection"
                    open={isConnectionDialogOpen}
                    onClose={() => setIsConnectionDialogOpen(false)}
                />
            )}
        </>
    );
};

const MuiAppBarStyled = styled(MuiAppBar)`
    margin-bottom: 2rem;
    height: 4.8125rem;
    background: ${({ theme }) => theme.custom.header.background};
    justify-content: center;
    box-shadow: none;
    border-bottom: 1px solid ${({ theme }) => theme.custom.text.borderColor};
`;

const HomeLinkStyled = styled(Link)`
    display: flex;
`;

const ConnectButtonStyled = styled(Button)`
    margin-right: 1rem;
`;

const RightButtonsWrapperStyled = styled(Box)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
`;

const MenuWrapperStyled = styled(Box)`
    width: 100%;
    display: flex;
    align-items: center;
`;

const DesktopMenuStyled = styled(Box)`
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        width: 100%;
        flex-grow: 0;
        display: flex;
        align-items: center;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
        flex-grow: 1;
    }
`;

const LogoWrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    flex: 1;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        flex: 0;
        margin-right: 0.5rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
        margin-right: 1rem;
    }
`;

const NetworkSelectionStyled = styled(NetworkSelection)`
    margin-left: 0.5rem;
`;

const LogoStyled = styled('img')`
    height: 3rem;
`;

const IconButtonStyled = styled(IconButton)`
    margin-left: 1rem;
`;

const MobileIconButtonStyled = styled(IconButton)`
    display: block;
    color: black;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        display: none;
    }
`;

export default Header;
