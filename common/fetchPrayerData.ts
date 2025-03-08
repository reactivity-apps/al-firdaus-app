type Props = {
    location: string;
};

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
                    days: number;
                };
                year: string;
                designation: {
                    abbreviated: string;
                    expanded: string;
                };
                holidays: string[];
                adjustedHolidays: string[];
                method: string;
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
                lunarSighting: boolean;
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


export const fetchPrayerTimings = async ({ location }: Props) => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

    // Example coordinates (London). You might want to dynamically determine these based on `location`.
    const latitude = 51.5194682;
    const longitude = -0.1360365;

    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=3&shafaq=general&tune=5,3,5,7,9,-1,0,8,-6&timezonestring=UTC&calendarMethod=UAQ`
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data: PrayerTimingsResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching prayer data:", error);
        return null;
    }
};

// export const fetchReciter = ({ location }: Props) => {

// };