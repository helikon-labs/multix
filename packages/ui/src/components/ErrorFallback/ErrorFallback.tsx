import { useNavigate, useRouteError } from 'react-router';
import { Alert, AlertTitle, Grid2 as Grid } from '@mui/material';
import { theme } from '../../styles/theme';
import { styled, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Button } from '../library';

export const ErrorFallback = () => {
    const routeError = useRouteError() as Error;
    const navigate = useNavigate();

    return (
        <MuiThemeProvider theme={theme}>
            <Grid
                justifyContent="center"
                alignItems="center"
                container
            >
                <Grid size={{ xs: 6 }}>
                    <AlertStyled
                        severity="error"
                        role="alert"
                    >
                        <AlertTitle>Oy yoi yoi! Something went wrong:</AlertTitle>
                        <pre>{routeError && routeError.message}</pre>
                        <ButtonStyled
                            variant="primary"
                            onClick={() =>
                                navigate({
                                    pathname: '/',
                                })
                            }
                        >
                            Go to Home
                        </ButtonStyled>
                    </AlertStyled>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
};

const AlertStyled = styled(Alert)`
    margin-top: 2rem;
    border-radius: ${({ theme }) => theme.custom.borderRadius};

    .MuiAlert-icon {
        flex: 0;
    }

    .MuiAlert-message {
        flex: 1;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const ButtonStyled = styled(Button)`
    margin-top: 1rem;
`;

export default ErrorFallback;
