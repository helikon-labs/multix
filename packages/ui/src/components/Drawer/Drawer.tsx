import Drawer from '@mui/material/Drawer';
import DrawerMenu from './DrawerMenu';
import { styled } from '@mui/material/styles';

const DRAWER_WIDTH = 240;

interface DrawerComponentProps {
    open: boolean;
    handleDrawerClose: () => void;
}

function MobileDrawerComponent({ open, handleDrawerClose }: DrawerComponentProps) {
    return (
        <DrawerStyled
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <DrawerMenu handleDrawerClose={handleDrawerClose} />
        </DrawerStyled>
    );
}

const DrawerStyled = styled(Drawer)`
    width: ${DRAWER_WIDTH}px;
    flex-shrink: 0;

    & .MuiDrawer-paper {
        width: ${DRAWER_WIDTH}px;
    }

    .MuiIconButton-root {
        color: black;
    }
`;

export default MobileDrawerComponent;
