export type PrayerTimingsResponse = {
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
    } | undefined;
}

export type Location = {
    name: string;
    address: string;
};
  
// TODO: Getting this error: Route "./api/prayerDataApi.ts" is missing the required default export. Ensure a React component is exported as default.
export const fetchPrayerTimings = async ( address: string ) => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;    

    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${address}`
        );

        const data: PrayerTimingsResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching prayer data:", error);
        return null;
    }
};
