import { Box, Fab } from "@mui/material";
import 'mapbox-gl/dist/mapbox-gl.css';

const MobileNavigationButton = ({ toMap }: { toMap: boolean }) => {
    return (
        <Box sx={{
            position: 'absolute',
            right: 0,
            margin: '10px',
            display: { xs: 'block', md: 'none' },
            ...(toMap ? { bottom: 0 } : { top: 0 })
        }} onClick={() => {
            window.scrollTo({
                top: (toMap ? document.documentElement.scrollHeight : 0),
                behavior: 'smooth'
            });

        }}>
            <Fab variant="extended">
                {toMap ? 'To Map' : 'To Timeline'}
            </Fab>
        </Box>
    );
}

export default MobileNavigationButton;