import { Button, Typography, } from "@mui/material";
import 'mapbox-gl/dist/mapbox-gl.css';
import { requestRoutes } from "../api/ApiHelper";

const TimelineButton = ({ quotes, currentRoute, setRoute, next }: { quotes: any, currentRoute: any, setRoute: any, next: boolean }) => {
    return (
        <Button sx={{width: '100%'}} variant="contained" onClick={() => {
            requestRoutes(quotes, (next ? currentRoute!.current + 1 : currentRoute!.current - 1), currentRoute, setRoute)
        }}>
            <Typography>
                {next ? "next" : "previous"}
            </Typography>
        </Button>
    );
}

export default TimelineButton;