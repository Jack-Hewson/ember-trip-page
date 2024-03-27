import { Typography } from "@mui/material";

// Hides text when using a small screen
const DesktopTypography = ({ text }: { text: string }) => {
    return (
        <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{text}:</Typography>
    )
}

export default DesktopTypography;