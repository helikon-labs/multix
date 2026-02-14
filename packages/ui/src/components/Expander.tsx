import { Box, Collapse } from '@mui/material';
import { ReactNode, useState } from 'react';
import { styled } from '@mui/material/styles';
import { HiChevronRight as ChevronRightIcon } from 'react-icons/hi2';

interface Props {
    className?: string;
    title: ReactNode;
    content: ReactNode;
    expanded?: boolean;
}

const Expander = ({ className = '', title, content, expanded = false }: Props) => {
    const [open, setOpen] = useState(expanded);

    return (
        <Box className={className}>
            <div
                data-cy="label-expander"
                onClick={() => setOpen(!open)}
                className="titleWrapper"
            >
                <ChevronRightIcon className={`${open ? 'rotated' : ''} expanderIcon`} />
                {title}
            </div>
            <Collapse
                in={open}
                data-cy="content-expander"
            >
                {content}
            </Collapse>
        </Box>
    );
};

export default styled(Expander)`
    display: flex;
    flex-direction: column;
    min-width: 0;

    .titleWrapper {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .expanderIcon {
        margin-right: 0.5rem;
        transition: transform 0.2s ease-in-out;
        &.rotated {
            transform: rotate(90deg);
        }
    }
`;
