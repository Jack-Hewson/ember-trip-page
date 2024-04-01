import axios from "axios";
import { getEndTime, getStartTime } from "../TimeHelper";

export const requestQuotes = (setQuotes: React.Dispatch<any>) => {
    axios.get(`https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=${getStartTime()}&departure_date_to=${getEndTime()}`)
        .then(response => {
            setQuotes(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export const requestRoutes = (quotes: any, nearestTime: number, currentRoute: React.MutableRefObject<number>, setRoute: React.Dispatch<any>) => {
    axios.get(`https://api.ember.to/v1/trips/${quotes?.quotes[nearestTime]?.legs[0].trip_uid}`)
        .then(response => {
            setRoute(response.data);
            currentRoute.current = nearestTime
        })
        .catch(error => {
            // 403 error if I request any routes in the past, this will call the last successful route
            console.error(error);
            requestRoutes(quotes, currentRoute.current!, currentRoute, setRoute)
        });
}