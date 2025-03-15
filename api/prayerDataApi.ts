import { PrayerDataResponse } from "@/types/prayer";

export const fetchPrayerTimings = async (address: string) => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;    

    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${address}`
        );

        const data: PrayerDataResponse = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching prayer data:", error);
        return null;
    }
};

export const fetchHaramWeatherDetails = async (latitude: number, longitude: number) => {
    const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        return null;
    }
}