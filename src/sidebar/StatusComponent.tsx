import { Stack, Typography } from "@mui/material";
import DesktopTypography from "../commonComponents/DesktopTypography";

const StatusComponent = (description) => {
    return (
        <Stack direction="row" spacing={2}>
            <DesktopTypography text="Status" />
            {
                description?.isCancelled ?
                    <Typography color="error">Cancelled</Typography>
                    :
                    <Typography color="green">Operating</Typography>
            }
        </Stack>
    )
}

export default StatusComponent;