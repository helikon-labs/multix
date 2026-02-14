import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';

interface Props {
    message: string;
    testId?: string;
}

const LoadingBox = ({ message, testId }: Props) => (
    <MessageBox data-cy={`loader-${testId}`}>
        <CircularProgress />
        <div>{message}</div>
    </MessageBox>
);

export const MessageBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
`;

export default LoadingBox;
