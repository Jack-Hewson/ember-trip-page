import { Grid, Stack, Tooltip, Typography } from "@mui/material";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const CapacityComponent = (availability) => {
    return (
        <Stack>
            <Stack direction="row" spacing={2}>
                <Typography>Capacity:</Typography>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Tooltip title="Wheelchair Capacity">
                            <Stack direction="row" spacing={1}>
                                <AccessibleIcon />
                                <Typography>{availability?.vehicle?.wheelchair}</Typography>
                            </Stack>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={6}>
                        <Tooltip title="Seating Capcity">
                            <Stack direction="row" spacing={1}>
                                <AirlineSeatReclineNormalIcon />
                                <Typography>{availability?.vehicle?.seat}</Typography>
                            </Stack>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={6}>
                        <Tooltip title="Bicycle Capcity">
                            <Stack direction="row" spacing={1}>
                                <PedalBikeIcon />
                                <Typography>{availability?.vehicle?.bicycle}</Typography>
                            </Stack>
                        </Tooltip>
                    </Grid>
                </Grid>

            </Stack>

        </Stack>

    )
}

export default CapacityComponent;