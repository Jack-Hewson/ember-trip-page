export const convertToTime = (timestamp: string): string => {
    const date = new Date(timestamp);

    // Extracting hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    // Constructing the 24-hour format string
    return `${hours}:${minutes}:${seconds}`;
}

export const calculateNearestTime = (quotesData: any): number => {
    const allTimes = quotesData.quotes.map((quote: any) => {
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

export const getStartTime = (): string => {
    const todaysDate = new Date()
    return new Date(todaysDate.setHours(0, 0, 0)).toISOString();
}

export const getEndTime = (): string => {
    const todaysDate = new Date()
    return new Date(todaysDate.setHours(23, 59, 59)).toISOString();
}

export const getGapInMinutes = (time: Date): string => {
    // Calculate the difference in milliseconds between the current date and the target date
    const differenceInMilliseconds = new Date().getTime() - time.getTime();
    // Convert milliseconds to minutes
    const minutes = Math.floor(differenceInMilliseconds / (1000 * 60))
    return `${minutes <= 0 ? 'Just now' : minutes + ' minute/s ago'}`;
}