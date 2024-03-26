import { Stack, Typography } from "@mui/material";

const RouteDetailsComponent = (details) => {
    return (
        <Stack>
            <Typography fontSize="3rem">{details?.details?.description?.destination_board}</Typography>
            <Typography>{details?.details?.origin.region_name} to {details?.details?.destination.region_name}</Typography>
        </Stack>
    )
}

export default RouteDetailsComponent;

