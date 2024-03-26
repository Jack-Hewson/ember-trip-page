import { Stack, Typography } from "@mui/material";

const StatusComponent = (description) => {
    return (
        <Stack direction="row" spacing={2}>
            <Typography>Status:</Typography>
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