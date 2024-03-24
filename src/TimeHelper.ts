export const convertToTime = (timestamp: string) => {
    const date = new Date(timestamp);

    // Extracting hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    // Constructing the 24-hour format string
    return `${hours}:${minutes}:${seconds}`;
}