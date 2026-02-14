import { Box, Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HiOutlineClock as AccessTimeIcon } from 'react-icons/hi2';

interface Props {
    className?: string;
}

const SuccessCreation = ({ className }: Props) => {
    return (
        <Box className={className}>
            <h1 data-cy="label-first-multisig-creation">Multisig creation in progress...</h1>
            <Grid
                container
                alignItems="center"
            >
                <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                    <AccessTimeIcon className="icon" />
                </Grid>
                <Grid size={{ xs: 12, sm: 8, md: 8, lg: 8 }}>
                    <h4 className="explainer">
                        It shouldn&apos;t take more than 30s.
                        <br />
                        This page will refresh automatically.
                    </h4>
                </Grid>
            </Grid>
        </Box>
    );
};

export default styled(SuccessCreation)`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;

    .icon {
        animation: spin 10s linear infinite;
        @keyframes spin {
            0% {
                transform: rotate(-360deg);
            }
            100% {
                transform: rotate(0deg);
            }
        }

        font-size: 10rem;
        color: ${({ theme }) => theme.custom.text.addressColorLightGray};
        text-align: center;
    }

    .explainer {
        margin-left: 1rem;
    }
`;
