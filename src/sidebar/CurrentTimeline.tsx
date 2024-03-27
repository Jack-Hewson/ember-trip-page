import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { convertToTime } from '../TimeHelper';
import { Grid, Stack, Typography } from '@mui/material';

export default function CurrentTimeline(route: any) {
    return (
        (route?.route?.route.map((stop) =>
            <Timeline position="alternate">
                <TimelineItem>
                    <TimelineOppositeContent>
                        {stop.location.name}  <br />
                        {stop.location.name !== stop.location.detailed_name && stop.location.detailed_name}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Stack direction="row" spacing={1}>
                            <Typography>Arrival:</Typography>
                            <Grid container columnGap={5}>
                                <Grid item xl={4} lg={12}>
                                    <Typography sx={{ textDecoration: stop.arrival.actual ? "line-through" : "" }}>
                                        {convertToTime(stop.arrival.scheduled)}
                                    </Typography>
                                </Grid>

                                <Grid item xl={4} lg={12}>
                                    {stop.arrival.actual && stop.arrival.actual !== stop.arrival.scheduled && <Typography color="error"> {convertToTime(stop.arrival.actual)}</Typography>}
                                </Grid>
                            </Grid>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                            <Typography>Departure:</Typography>
                            <Grid container columnGap={5}>
                                <Grid item xl={4} lg={12}>
                                    <Typography sx={{ textDecoration: stop.departure.actual ? "line-through" : "" }}>
                                        {convertToTime(stop.departure.scheduled)}
                                    </Typography>
                                </Grid>

                                <Grid item xl={4} lg={12}>
                                    {stop.departure.actual && stop.departure.actual !== stop.departure.scheduled && <Typography color="error"> {convertToTime(stop.departure.actual)}</Typography>}
                                </Grid>
                            </Grid>
                        </Stack>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        ))
    );
}