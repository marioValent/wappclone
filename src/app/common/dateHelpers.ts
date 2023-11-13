export const isAfterMidnight = (date: string) => {
    const givenDate = new Date(date);
    const lastMidnight = new Date();
    lastMidnight.setHours(0, 0, 0, 0);

    if (lastMidnight >= givenDate) return false;
    return true;
};

export const formatTime = (time: string): string => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

export const formatDay = (date: string): string => {
    const todayDate = new Date();
    const targetDate = new Date(date);

    const timeDifference = todayDate.getTime() - targetDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const yesterdayMidnight = new Date();
    yesterdayMidnight.setDate(todayDate.getDate() - 1);
    yesterdayMidnight.setHours(0, 0, 0, 0);
    if (daysDifference < 1) {
        const midnight = new Date(todayDate);
        midnight.setHours(0, 0, 0, 0);
        if (targetDate.getTime() >= midnight.getTime()) {
            return "Today";
        } else {
            return "Yesterday";
        }
    } else if (targetDate.getTime() >= yesterdayMidnight.getTime()) {
        return "Yesterday";
    } else if (daysDifference <= 7) {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const dayOfWeekIndex = targetDate.getDay();
        return daysOfWeek[dayOfWeekIndex];
    } else {
        const day = targetDate.getDate().toString().padStart(2, "0");
        const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
        const year = targetDate.getFullYear();
        return `${day}/${month}/${year}`;
    }
};
