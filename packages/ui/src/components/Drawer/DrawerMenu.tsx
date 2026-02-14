import IconButton from '@mui/material/IconButton';
import { HiOutlineChevronRight as ChevronRightIcon, HiOutlineWallet } from 'react-icons/hi2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useAccounts } from '../../contexts/AccountsContext';
import { styled } from '@mui/material/styles';
import NetworkSelection from '../select/NetworkSelection';
import MultiProxySelection from '../select/MultiProxySelection';
import { MENU_ROUTES } from '../../pages/routes';
import { Button, NavLink } from '../library';
import { createSearchParams, useSearchParams } from 'react-router';

interface DrawerMenuProps {
    handleDrawerClose: () => void;
}

function DrawerMenu({ handleDrawerClose }: DrawerMenuProps) {
    const { ownAccountList, setIsConnectionDialogOpen, allowConnectionToExtension } = useAccounts();
    const [params] = useSearchParams();

    return (
        <>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon size={20} />
                </IconButton>
            </DrawerHeader>
            <List disablePadding={true}>
                {!ownAccountList.length ? (
                    <ListItemStyled disablePadding>
                        <ButtonStyled
                            variant="primary"
                            onClick={() => {
                                setIsConnectionDialogOpen(true);
                                allowConnectionToExtension();
                            }}
                        >
                            Connect
                        </ButtonStyled>
                    </ListItemStyled>
                ) : (
                    <ListItemStyled>
                        <Button onClick={() => setIsConnectionDialogOpen(true)}>
                            <WalletButtonStyled>
                                <HiOutlineWallet
                                    className="wallet-icon"
                                    size={20}
                                />{' '}
                                Show wallets
                            </WalletButtonStyled>
                        </Button>
                    </ListItemStyled>
                )}
                <ListItemStyled>
                    <MultiProxySelection testId="mobile" />
                </ListItemStyled>
                <ListItemStyled>
                    <NetworkSelection />
                </ListItemStyled>
                {MENU_ROUTES.map(({ path, name, isDisplayWhenNoWallet }) => {
                    const paramsString = createSearchParams(params).toString();

                    return (
                        isDisplayWhenNoWallet && (
                            <ListItemStyled
                                key={name}
                                disablePadding
                            >
                                <NavLink
                                    onClick={handleDrawerClose}
                                    to={`${path}?${paramsString}`}
                                >
                                    <ListItemText primary={name} />
                                </NavLink>
                            </ListItemStyled>
                        )
                    );
                })}
            </List>
        </>
    );
}

const WalletButtonStyled = styled('div')`
    font-weight: 400;
    display: flex;

    .wallet-icon {
        margin-right: 0.5rem;
    }
`;
const ListItemStyled = styled(ListItem)`
    justify-content: center;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        justify-content: flex-end;
    }

    a {
        width: 100%;
        text-align: center;

        @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
            width: auto;
        }
    }
`;

const ButtonStyled = styled(Button)`
    margin-right: 1rem;
`;

const DrawerHeader = styled('div')`
    display: flex;
    align-items: center;
    padding: 0 8px;
    justify-content: flex-start;
`;

export default DrawerMenu;
