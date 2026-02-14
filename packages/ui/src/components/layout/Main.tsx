import React from 'react';
import { Box } from '@mui/material';
import Header from '../Header/Header';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router';
import MobileMenu from '../Drawer/Drawer';
import { styled } from '@mui/material/styles';

function MainLayout() {
    const [open, setOpen] = React.useState(false);

    return (
        <BoxStyled>
            <Header handleDrawerOpen={() => setOpen(true)} />
            <Container
                fixed
                maxWidth="lg"
            >
                <Outlet />
            </Container>
            <MobileMenu
                open={open}
                handleDrawerClose={() => setOpen(false)}
            />
        </BoxStyled>
    );
}

const BoxStyled = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export default MainLayout;
