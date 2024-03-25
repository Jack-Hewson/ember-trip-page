export const convertToTime = (timestamp: string) => {
    const date = new Date(timestamp);

    // Extracting hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    // Constructing the 24-hour format string
    return `${hours}:${minutes}:${seconds}`;
}

export const calculateNearestTime = (quotes: any) => {
    const allTimes = quotes.quotes.map((quote) => {
        return (quote.legs[0].departure.actual || quote.legs[0].departure.estimated || quote.legs[0].departure.scheduled)
    })

    const dates: Date[] = allTimes.map((timeString: string) => new Date(timeString));
    const currentTime: Date = new Date();
    // Find the index of the nearest timestamp
    let nearestIndex: number = 0;
    let shortestDifference: number = Math.abs(currentTime.getTime() - dates[0].getTime());
    for (let i = 1; i < dates.length; i++) {
        const difference: number = Math.abs(currentTime.getTime() - dates[i].getTime());
        if (difference < shortestDifference) {
            shortestDifference = difference;
            nearestIndex = i;
        }
    }

    return nearestIndex;
}

export const getStartTime = () => {
    const todaysDate = new Date()
    return new Date(todaysDate.setHours(0, 0, 0)).toISOString();
}

export const getEndTime = () => {
    const todaysDate = new Date()
    return new Date(todaysDate.setHours(23, 59, 59)).toISOString();
}