/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import './App.css';
import CurrentTimeline from './CurrentTimeline';
import { Box, Button, Grid, Typography } from '@mui/material';
import MapContainer from './map/MapContainer';
import { calculateNearestTime } from './TimeHelper';
import { requestQuotes, requestRoutes } from './api/ApiHelper';

function App() {
    const [quotes, setQuotes] = useState<any>();
    const [route, setRoute] = useState<any>();
    const currentRoute = useRef<number>(null);

    useEffect(() => {
        requestQuotes(setQuotes)
    }, []);

    useEffect(() => {
        if (quotes) {
            // by default, the timeline displays the route with the nearest starting stop's departure time
            const nearestTime = calculateNearestTime(quotes)
            requestRoutes(quotes, nearestTime, currentRoute, setRoute)
        }
    }, [quotes])

    return (
        <Box sx={{ width: '100%', flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{ height: '100vh', overflow: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Typography>{route?.description?.route_number}</Typography>
                        </Grid>
                        <Grid item xs={9} >
                            <Typography> Facilities: Toilets - {route?.vehicle?.has_toilet}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Button onClick={() => {
                                requestRoutes(quotes, currentRoute!.current - 1, currentRoute, setRoute)
                            }}>-</Button>
                        </Grid>
                        <Grid item xs={6} >
                            <Button onClick={() => {
                                requestRoutes(quotes, currentRoute!.current + 1, currentRoute, setRoute)
                            }}>+</Button>
                        </Grid>
                        <CurrentTimeline route={route} />
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <MapContainer route={route} />
                </Grid>
            </Grid>
            {/* <Timetable route={route}/> */}
        </Box>
    )
}

export default App
