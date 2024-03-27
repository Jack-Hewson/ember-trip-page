import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function LoadingSpinner() {
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
        if (count === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, []);



    return (
        <Stack alignItems="center"
            spacing={0}
            direction="column"
            justifyContent="center"

            sx={{ minHeight: '100vh' }}>
            {count > 0 ?
                <>
                    <CircularProgress />
                    <Typography>Loading Bus Timetable and Information</Typography>
                </>
                :
                <>
                    <Typography color="error">Error Loading</Typography>
                    <Typography color="error">Please Refresh The Page</Typography>
                </>
            }

        </Stack>
    );
}