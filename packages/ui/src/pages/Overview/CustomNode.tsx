import { styled } from '@mui/material/styles';
import { Handle, Position } from 'reactflow';
import { Box } from '@mui/material';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import { AccountBadge } from '../../types';

export type NodeData = {
    address: string;
    badge?: AccountBadge;
    handle: 'right' | 'left' | 'both';
};

interface Props {
    data: NodeData;
    className?: string;
}

const CustomNode = ({ data, className = '' }: Props) => {
    const { address, badge, handle } = data;

    return (
        <Box className={className}>
            {(handle === 'both' || handle === 'right') && (
                <Handle
                    id="right"
                    type="source"
                    position={Position.Right}
                />
            )}
            {(handle === 'both' || handle === 'left') && (
                <Handle
                    id="left"
                    type="target"
                    position={Position.Left}
                />
            )}
            <AccountDisplay
                address={address}
                badge={badge}
                canCopy
            />
        </Box>
    );
};

export default styled(CustomNode)`
    padding-right: 1rem;
    padding-left: 1rem;
    max-width: 15rem;
`;
