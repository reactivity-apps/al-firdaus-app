export type PrayerDataResponse = {
    code: number;
    status: string;
    data: {
        timings: {
            Fajr: string;
            Sunrise: string;
            Dhuhr: string;
            Asr: string;
            Sunset: string;
            Maghrib: string;
            Isha: string;
            Imsak: string;
            Midnight: string;
            Firstthird: string;
            Lastthird: string;
        };
        date: {
            readable: string;
            timestamp: string;
            hijri: {
            date: string;
            format: string;
            day: string;
            weekday: {
                en: string;
                ar: string;
            };
            month: {
                number: number;
                en: string;
                ar: string;
                days?: number;
            };
            year: string;
            designation: {
                abbreviated: string;
                expanded: string;
            };
            holidays?: string[];
            adjustedHolidays?: string[];
            method?: string;
            };
            gregorian: {
            date: string;
            format: string;
            day: string;
            weekday: {
                en: string;
            };
            month: {
                number: number;
                en: string;
            };
            year: string;
            designation: {
                abbreviated: string;
                expanded: string;
            };
            lunarSighting?: boolean;
            };
        };
        meta: {
            latitude: number;
            longitude: number;
            timezone: string;
            method: {
            id: number;
            name: string;
            params: {
                Fajr: number;
                Isha: number;
            };
            location: {
                latitude: number;
                longitude: number;
            };
            };
            latitudeAdjustmentMethod: string;
            midnightMode: string;
            school: string;
            offset: {
                Imsak: number;
                Fajr: number;
                Sunrise: number;
                Dhuhr: number;
                Asr: number;
                Sunset: number;
                Maghrib: number;
                Isha: number;
                Midnight: number;
            };
        };
        };
};

export type PrayerTimings = {
    Fajr: string; 
    Sunrise: string; 
    Dhuhr: string; 
    Asr: string; 
    Sunset: string; 
    Maghrib: string;
    Isha: string; 
    Imsak: string; 
    Midnight: string;
    Firstthird: string; 
    Lastthird: string; 
} | undefined;

export type Location = {
    name: string;
    address: string;
    lat: number;
    long: number;
};
  
export const locations: Location[] = [
    { 
        name: "Makkah", 
        address: "Al Haram, Makkah 24231, Saudi Arabia", 
        lat: 21.4259, 
        long: 39.8272 
    },
    { 
        name: "Madina", 
        address: "Al Haram, Madinah 42311, Saudi Arabia", 
        lat: 24.4684, 
        long: 39.6105 
    },
];

export const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const getNextPrayer = (timings: PrayerTimings) => {
    const currentTime = new Date();
    if (timings) {
        for (let prayer of prayerNames) {
            const prayerTime = new Date();
            const [hours, minutes] = timings[prayer as keyof typeof timings]
                .split(":")
                .map(Number);
            prayerTime.setHours(hours, minutes, 0, 0);

            if (prayerTime > currentTime) {
                return prayer; // Return the next prayer
            }
        }
    }
    return "Fajr"; // Default to "Fajr" if all prayers have passed
};

// Function to find the next prayer
export const getTimeUntilNextPrayer = (timings: PrayerTimings): string => {
    const currentTime = new Date();

    if (timings) {
        for (let prayer of prayerNames) {
            const prayerTime = new Date();
            const [hours, minutes] = timings[prayer as keyof typeof timings]
                .split(":")
                .map(Number);
            
            prayerTime.setHours(hours, minutes, 0, 0);

            // If the prayer time is in the future, calculate the time difference
            if (prayerTime > currentTime) {
                const timeDifference = prayerTime.getTime() - currentTime.getTime(); // Get time difference in milliseconds
                const hoursUntilNextPrayer = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert to hours
                const minutesUntilNextPrayer = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Convert to minutes

                // Return formatted string "hh:mm"
                return `${String(hoursUntilNextPrayer).padStart(2, '0')}:${String(minutesUntilNextPrayer).padStart(2, '0')}`;
            }
        }

        // If all prayers have passed, calculate time until Fajr on the next day
        const fajrTime = new Date();
        const [fajrHours, fajrMinutes] = timings["Fajr"].split(":").map(Number);
        fajrTime.setHours(fajrHours, fajrMinutes, 0, 0);

        // If the current time is after Fajr, we need to calculate the time until the next day's Fajr
        if (currentTime > fajrTime) {
            fajrTime.setDate(fajrTime.getDate() + 1); // Set Fajr time for the next day
        }

        const timeDifference = fajrTime.getTime() - currentTime.getTime();
        const hoursUntilFajr = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert to hours
        const minutesUntilFajr = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Convert to minutes

        // Return formatted string "hh:mm"
        return `${String(hoursUntilFajr).padStart(2, '0')}:${String(minutesUntilFajr).padStart(2, '0')}`;
    }

    return ""; // Return an empty string if no timings are available
};
