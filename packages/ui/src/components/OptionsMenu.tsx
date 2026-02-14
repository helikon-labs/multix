import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { HiEllipsisVertical as MoreVertIcon } from 'react-icons/hi2';
import { ButtonWithIcon } from './library';

export interface MenuOption {
    text: string;
    icon: ReactNode;
    onClick: () => void;
}

const ITEM_HEIGHT = 48;

interface Props {
    className?: string;
    options: MenuOption[];
    menuButtonBorder?: CSSStyleDeclaration['border'];
}

const OptionsMenu = ({ className, options, menuButtonBorder }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback(
        (clickFunction: MenuOption['onClick']) => {
            handleClose();
            clickFunction();
        },
        [handleClose],
    );

    return (
        <div className={className}>
            <ButtonWithIconStyled
                border={menuButtonBorder}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
                data-cy="button-options-menu"
            >
                <MoreVertIcon />
            </ButtonWithIconStyled>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        className="menuEntry"
                        key={option.text}
                        onClick={() => handleClick(option.onClick)}
                        data-cy={`menu-option-${option.text.toLowerCase().replace(/ /g, '-')}`}
                    >
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        <ListItemText>{option.text}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

const ButtonWithIconStyled = styled(ButtonWithIcon)`
    padding: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    border: ${({ theme, border }) => border || `1px solid ${theme.custom.text.borderColor}`};

    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        width: 2.25rem;
    }

    svg {
        margin: 0;
        transform: scale(1.5);
    }
`;

export default styled(OptionsMenu)`
    margin-left: 0.5rem;

    @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
        margin-left: 1rem;
    }
`;
