/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import './App.css';
import CurrentTimeline from './sidebar/CurrentTimeline';
import { Box, ButtonGroup, Grid, IconButton } from '@mui/material';
import MapContainer from './map/MapContainer';
import { calculateNearestTime } from './TimeHelper';
import { requestQuotes, requestRoutes } from './api/ApiHelper';
import FacilitiesComponent from './sidebar/FacilitiesComponent';
import CapacityComponent from './sidebar/CapacityComponent';
import StatusComponent from './sidebar/StatusComponent';
import PurchaseComponent from './sidebar/PurchaseComponent';
import RouteDetailsComponent from './sidebar/RouteDetailsComponent';
import MobileNavigationButton from './navigation/MobileNavigationButton';
import TimelineButton from './navigation/TimelineButton';
import Divider from '@mui/material/Divider';
import LoadingSpinner from './commonComponents/LoadingSpinner';

function App() {
    const [quotesData, setQuotesData] = useState<any>();
    const [routeData, setRouteData] = useState<any>();
    const currentRoute = useRef<number>(null);

    useEffect(() => {
        requestQuotes(setQuotesData)
    }, []);

    useEffect(() => {
        if (quotesData) {
            // by default, the timeline displays the route with the nearest starting stop's departure time
            const nearestTime = calculateNearestTime(quotesData)
            requestRoutes(quotesData, nearestTime, currentRoute, setRouteData)

            // requests the route data every second for live gps location
            const interval = setInterval(() => requestRoutes(quotesData, currentRoute!.current, currentRoute, setRouteData), 1000)
            return () => {
                clearInterval(interval);
            }
        }
    }, [quotesData])

    return (
        <Box sx={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
            <IconButton
                href="https://www.ember.to/" target="_blank"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 999
                }}
            >
                <img src="src/images/ember_logo.PNG" width="32" height="32" alt="ember_logo" />
            </IconButton>
            <Grid container spacing={2}>
                <Grid item lg={3} xs={12} sx={{ height: '100%', position: 'relative' }}>

                    {quotesData ? // show loading spinner if quotes aren't ready yet
                        <Grid container sx={{ padding: '2rem', height: '20vh', position: 'relative', zIndex: 100 }} spacing={0}>
                            <Grid item lg={5} xs={3} >
                                <RouteDetailsComponent details={quotesData?.quotes[currentRoute.current]?.legs[0]} />
                            </Grid>
                            <Grid item lg={7} xs={9}  >
                                <Grid container spacing={2}>
                                    <Grid item lg={12} xs={6} >
                                        <FacilitiesComponent vehicle={routeData?.vehicle} />
                                    </Grid>
                                    <Grid item lg={12} xs={6} >
                                        <CapacityComponent vehicle={quotesData?.quotes[currentRoute.current]?.availability} />
                                    </Grid>
                                    <Grid item xs={5} >
                                        <StatusComponent description={routeData?.description} />
                                    </Grid>
                                    <Grid item xs={7} >
                                        <PurchaseComponent />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <ButtonGroup fullWidth>
                                <Grid item xs={6} >
                                    <TimelineButton quotes={quotesData} currentRoute={currentRoute} setRoute={setRouteData} next={false} />
                                </Grid>
                                <Grid item xs={6} >
                                    <TimelineButton quotes={quotesData} currentRoute={currentRoute} setRoute={setRouteData} next={true} />
                                </Grid>
                            </ButtonGroup>
                        </Grid>
                        :
                        <LoadingSpinner />
                    }

                    <Divider />
                    <Box sx={{ height: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
                        <CurrentTimeline route={routeData} />
                    </Box>

                    <MobileNavigationButton toMap={true} />

                </Grid>
                <Grid item lg={9} xs={12}>
                    <MapContainer route={routeData} />
                </Grid>
            </Grid>
        </Box >
    )
}

export default App
