import { Box } from '@mui/material';
import { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { AccountBadge } from '../../types';
import CustomNode, { NodeData } from './CustomNode';
import ReactFlow, {
    FitViewOptions,
    Node,
    Edge,
    DefaultEdgeOptions,
    Background,
    Controls,
    MarkerType,
    NodeTypes,
} from 'reactflow';

interface Props {
    className?: string;
}

const nodeTypes: NodeTypes = {
    custom: CustomNode,
};

const fitViewOptions: FitViewOptions = {
    padding: 0.1,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
    markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
    },
};

interface NodeParams {
    id: string;
    data: NodeData;
    position: { x: number; y: number };
}

const nodeFactory = ({ id, position, data }: NodeParams) => {
    return {
        id,
        type: 'custom',
        data,
        position: { x: position.x, y: position.y },
    };
};

const HORIZONTAL_GAP_BETWEEN_NODES = 70;
const VERTICAL_GAP_BETWEEN_NODES = 300;

const OverviewHeaderView = ({ className }: Props) => {
    const { selectedMultiProxy } = useMultiProxy();
    const uniqueSignatoriesSet = useMemo(() => {
        const uniqueSignatories = new Set<string>();
        selectedMultiProxy?.multisigs.forEach((multisig) => {
            multisig.signatories?.forEach((address) => {
                uniqueSignatories.add(address);
            });
        });

        return uniqueSignatories;
    }, [selectedMultiProxy?.multisigs]);

    const nodes = useMemo<Node[]>(() => {
        if (uniqueSignatoriesSet.size === 0 || !selectedMultiProxy?.multisigs) return [];
        const resNodes: Node[] = [];
        let ySigPosition = 0;
        for (const sig of uniqueSignatoriesSet.values()) {
            resNodes.push(
                nodeFactory({
                    id: sig,
                    data: { address: sig, handle: 'right' },
                    position: { x: 0, y: ySigPosition },
                }),
            );
            ySigPosition += HORIZONTAL_GAP_BETWEEN_NODES;
        }
        let yMultiPosition = 0;
        for (const multisig of selectedMultiProxy.multisigs) {
            resNodes.push(
                nodeFactory({
                    id: multisig.address,
                    data: { address: multisig.address, handle: 'both', badge: AccountBadge.MULTI },
                    position: { x: VERTICAL_GAP_BETWEEN_NODES, y: yMultiPosition },
                }),
            );
            yMultiPosition += HORIZONTAL_GAP_BETWEEN_NODES;
        }
        if (selectedMultiProxy.proxy) {
            resNodes.push(
                nodeFactory({
                    id: selectedMultiProxy.proxy,
                    data: {
                        address: selectedMultiProxy.proxy,
                        handle: 'left',
                        badge: AccountBadge.PURE,
                    },
                    position: { x: VERTICAL_GAP_BETWEEN_NODES * 2, y: 0 },
                }),
            );
        }
        return resNodes;
    }, [selectedMultiProxy, uniqueSignatoriesSet]);

    const edges = useMemo<Edge[]>(() => {
        if (!selectedMultiProxy?.multisigs) return [];
        const resEdges: Edge[] = [];
        selectedMultiProxy.multisigs.forEach(({ address: multiAddress, signatories, type }) => {
            signatories?.forEach((sigAddress) => {
                resEdges.push({
                    id: `${sigAddress}-${multiAddress}`,
                    source: sigAddress,
                    target: multiAddress,
                    sourceHandle: 'right',
                    targetHandle: 'left',
                    ...defaultEdgeOptions,
                });
            });
            if (selectedMultiProxy.proxy) {
                resEdges.push({
                    id: `${multiAddress}-${selectedMultiProxy.proxy}`,
                    source: multiAddress,
                    target: selectedMultiProxy.proxy,
                    sourceHandle: 'right',
                    targetHandle: 'left',
                    label: `controls-${type}`,
                    ...defaultEdgeOptions,
                });
            }
        });
        return resEdges;
    }, [selectedMultiProxy]);

    const reactFlowKey = [
        selectedMultiProxy?.proxy,
        ...(selectedMultiProxy?.multisigs?.map((m) => m.address) ?? []),
    ].join('-');

    return (
        <Box className={className}>
            <ReactFlow
                key={reactFlowKey}
                defaultNodes={nodes}
                defaultEdges={edges}
                fitView
                fitViewOptions={fitViewOptions}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background style={{ backgroundColor: '#f7f7f7' }} />
            </ReactFlow>
        </Box>
    );
};

export default styled(OverviewHeaderView)`
    width: 100%;
    height: 500px;
`;
