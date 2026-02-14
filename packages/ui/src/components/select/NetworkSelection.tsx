import { useCallback, useMemo } from 'react';
import { ListSubheader, MenuItem, Select as SelectMui, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { useNetwork } from '../../contexts/NetworkContext';
import {
    kusamaNetworksAndParachains,
    networkList,
    polkadotNetworksAndParachains,
    soloChains,
    testChains,
} from '../../constants';
import { theme } from '../../styles/theme';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { useApi } from '../../contexts/ApiContext';

const NetworkSelection = () => {
    const { selectedNetwork, selectNetwork } = useNetwork();
    // if no ws endpoint is set (in the env) for local nodes, we filter it out
    const networksToShow = useMemo(() => {
        return networkList.local.httpGraphqlUrl
            ? Object.entries(networkList)
            : Object.entries(networkList).filter(([name]) => name !== 'local');
    }, []);
    const { resetLists } = useMultiProxy();
    const { resetApi } = useApi();

    const handleNetworkSelection = useCallback(
        ({ target: { value } }: SelectChangeEvent<unknown>) => {
            if (typeof value !== 'string') {
                console.error('Unexpected network value, expect string but received', value);
                return;
            }

            resetLists();
            resetApi();
            selectNetwork(value, true);
        },
        [resetLists, selectNetwork, resetApi],
    );

    const renderNetworks = useCallback(
        (allowedNetworks: string[]) => {
            const displayedNetworks = networksToShow.filter(([networkName]) =>
                allowedNetworks.includes(networkName),
            );

            return displayedNetworks.map(([networkName, { networkLogo }]) => (
                <MenuItemStyled
                    key={networkName}
                    value={networkName}
                    data-cy={`select-network-option-${networkName}`}
                    className={displayedNetworks.length === 1 ? 'oneLine' : undefined}
                >
                    <ImgStyled
                        alt={`network-logo-${networkName}`}
                        src={networkLogo}
                    />
                    <ItemNameStyled>{networkName}</ItemNameStyled>
                </MenuItemStyled>
            ));
        },
        [networksToShow],
    );

    if (!selectedNetwork) {
        return null;
    }

    return (
        <SelectStyled
            IconComponent={HiOutlineChevronDown}
            value={selectedNetwork}
            autoWidth={true}
            onChange={handleNetworkSelection}
            MenuProps={MenuPropsStyles}
            data-cy={`select-networks`}
        >
            <ListSubheader>Polkadot & Parachains</ListSubheader>
            {renderNetworks(polkadotNetworksAndParachains)}
            <ListSubheader>Kusama & Parachains</ListSubheader>
            {renderNetworks(kusamaNetworksAndParachains)}
            <ListSubheader>Solo chains</ListSubheader>
            {renderNetworks(soloChains)}
            <ListSubheader>Testnets</ListSubheader>
            {renderNetworks(testChains)}
        </SelectStyled>
    );
};

const MenuPropsStyles = {
    sx: {
        marginTop: '.75rem',

        '.MuiPaper-root': {
            marginTop: '2px',
            boxShadow: 'none',
            border: 'none',
            outline: `1px solid ${theme.custom.text.borderColor}`,

            ul: {
                border: 'none',
            },
        },

        '.MuiMenuItem-root': {
            maxWidth: '100%',
            padding: '0.75rem',
        },

        '.MuiList-root': {
            columnFill: 'balance',
            padding: 0,
            border: `1px solid ${theme.custom.text.borderColor}`,
            borderRadius: '0.5rem',
        },

        '.MuiListSubheader-root': {
            columnSpan: 'all',
        },

        [theme.breakpoints.up('xs')]: {
            '.MuiList-root': {
                columns: '160px 2',
            },
        },

        [theme.breakpoints.up('sm')]: {
            '.MuiList-root': {
                columns: '180px 2',
            },
        },

        [theme.breakpoints.up('md')]: {
            '.MuiList-root': {
                columns: '200px 2',
            },
        },
    },
};

const SelectStyled = styled(SelectMui)`
    display: inline-flex;
    width: 100%;
    background: ${({ theme }) => theme.palette.primary.white};
    outline: 1.5px solid ${({ theme }) => theme.custom.text.borderColor};
    text-transform: capitalize;
    border-radius: ${({ theme }) => theme.custom.borderRadius};
    cursor: pointer;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        margin-left: 1rem;
        max-width: fit-content;
    }

    .MuiSelect-select {
        display: flex;
        padding-right: 2.5rem !important;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;

        @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
            padding-right: 2rem !important;
        }

        div:last-child {
            @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
                display: none;
            }
        }
    }

    .MuiList-root {
        columns: 100vw 3;
        column-fill: balance;

        @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
            columns: 100px 2;
            column-fill: auto;
        }
    }

    svg {
        color: ${({ theme }) => theme.custom.text.black};
        width: 1.25rem;
        height: 1.25rem;
        top: calc(50% - 0.65em);
    }

    .MuiSelect-icon {
        right: 9px;
    }

    .MuiOutlinedInput-notchedOutline {
        border: none;
    }
`;

const MenuItemStyled = styled(MenuItem)`
    text-transform: capitalize;
    padding: 0.75rem;
    max-width: 9.1875rem;
    box-sizing: content-box;

    &.oneLine {
        column-span: all;
    }
`;

const ImgStyled = styled('img')`
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.5rem;
    border-radius: 50%;
`;

const ItemNameStyled = styled('div')`
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${({ theme }) => theme.custom.text.black};
`;

export default NetworkSelection;
