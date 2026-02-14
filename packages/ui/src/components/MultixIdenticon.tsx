import { useCallback, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ICON_SIZE_MEDIUM, DEFAULT_ICON_THEME } from '../constants';
import Identicon from '@polkadot/react-identicon';
import { styled } from '@mui/material/styles';
import { useApi } from '../contexts/ApiContext';

const DEFAULT_PLACEMENT = 'top';
const DEFAULT_TITLE = 'Address copied!';
const DEFAULT_AUTO_HIDE_DURATION = 2000;

interface Props {
    value?: string;
    size?: number;
    className?: string;
}
const MultixIdenticon = ({ value, size = ICON_SIZE_MEDIUM, className }: Props) => {
    const [open, setOpen] = useState(false);
    const handleTooltipClose = useCallback(() => setOpen(false), []);
    const handleTooltipOpen = useCallback(() => setOpen(true), []);
    const { chainInfo } = useApi();

    return (
        <Tooltip
            onClose={handleTooltipClose}
            open={open}
            title={DEFAULT_TITLE}
            placement={DEFAULT_PLACEMENT}
            leaveDelay={DEFAULT_AUTO_HIDE_DURATION}
        >
            <TooltipIconStyled data-cy="icon-identicon">
                <Identicon
                    onCopy={handleTooltipOpen}
                    value={value}
                    theme={
                        chainInfo?.isEthereum || value?.length === 42
                            ? 'ethereum'
                            : DEFAULT_ICON_THEME
                    }
                    size={size}
                    className={className}
                />
            </TooltipIconStyled>
        </Tooltip>
    );
};

const TooltipIconStyled = styled('div')`
    display: inherit;
    line-height: 0;

    img {
        border-radius: 50%;
    }
`;

export default MultixIdenticon;
