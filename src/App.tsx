/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CurrentTimeline from './CurrentTimeline';
import { Box, Grid } from '@mui/material';
import MapContainer from './map/MapContainer';

function App() {
    const [quotes, setQuotes] = useState<any>();
    const [route, setRoute] = useState<any>();

    useEffect(() => {
        const todaysDate = new Date()
        const startTime = new Date(todaysDate.setHours(0, 0, 0)).toISOString();
        const endTime = new Date(todaysDate.setHours(23, 59, 59)).toISOString();
        console.log(startTime)
        console.log(endTime)
        axios.get(`https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=${startTime}&departure_date_to=${endTime}`)
            .then(response => {
                setQuotes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (quotes) {
            axios.get(`https://api.ember.to/v1/trips/${quotes.quotes[20].legs[0].trip_uid}`)
                .then(response => {
                    setRoute(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            //   quotes.quotes.forEach((quote) => {
            //     axios.get(`https://api.ember.to/v1/trips/${quote.legs[0].trip_uid}`)
            //       .then(response => {
            //         console.log(response.data)
            //         // setQuotes(response.data);
            //       })
            //       .catch(error => {
            //         console.error(error);
            //       });
            //   })

        }
    }, [quotes])

    // useEffect(() => {
    //     console.log(route)
    //     if (quotes) {
    //         console.log(quotes)
    //         console.log(quotes.quotes)
    //         quotes.quotes.forEach((q) => {
    //             console.log(q.legs[0].description.destination_board)
    //         })
    //     }
    // })

    return (
        <Box sx={{ width: '100%', flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{ height: '100vh', overflow: 'auto' }}>
                    <CurrentTimeline route={route} />
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
