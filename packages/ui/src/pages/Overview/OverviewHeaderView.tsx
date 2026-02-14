import { Box } from '@mui/material';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useMultiProxy } from '../../contexts/MultiProxyContext';
import { AccountBadge } from '../../types';
import CustomNode, { NodeData } from './CustomNode';
import ReactFlow, {
    addEdge,
    FitViewOptions,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    DefaultEdgeOptions,
    Background,
    Controls,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
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
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const uniqueSignatoriesSet = useMemo(() => {
        const res = new Set<string>();
        selectedMultiProxy?.multisigs.forEach((multisig) => {
            multisig.signatories?.forEach((address) => {
                res.add(address);
            });
        });

        return res;
    }, [selectedMultiProxy?.multisigs]);

    useEffect(() => {
        if (uniqueSignatoriesSet.size === 0 || !selectedMultiProxy?.multisigs) return;

        const resNodes: Node[] = [];
        const resEdges: Edge[] = [];

        let ySigPosition = 0;
        // create nodes
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
                    data: {
                        address: multisig.address,
                        handle: 'both',
                        badge: AccountBadge.MULTI,
                    },
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

        //create edges
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

        setNodes(resNodes);
        setEdges(resEdges);
    }, [selectedMultiProxy, uniqueSignatoriesSet]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <Box className={className}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
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
