import React from 'react';
import { Grid2 as Grid } from '@mui/material';

interface Props {
    className?: string;
    children: React.ReactNode;
}
export const Center = ({ children, className }: Props) => (
    <Grid
        className={className}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: '100%' }}
    >
        <Grid size={{ xs: 12, md: 10, lg: 8 }}>{children}</Grid>
    </Grid>
);
