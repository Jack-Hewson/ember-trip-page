import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { convertToTime } from './TimeHelper';

export default function CurrentTimeline(route: any) {
    return (
        (route?.route?.route.map((stop) =>
            <Timeline position="alternate">
                <TimelineItem onClick={() => {
                    console.log(stop)
                }}>
                    <TimelineOppositeContent>
                        {stop.location.name}  <br />
                        {stop.location.name !== stop.location.detailed_name && stop.location.detailed_name}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        Arrival: {convertToTime(stop.arrival.actual || stop.arrival.estimated || stop.arrival.scheduled)}  <br />
                        Departure: {convertToTime(stop.departure.actual || stop.departure.estimated || stop.departure.scheduled)}
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        )
        )
    );
}