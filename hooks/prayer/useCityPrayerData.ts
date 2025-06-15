import { useState, useEffect } from 'react';
import { PrayerDataResponse, PrayerTimings } from '@/types/prayer';
import cache from '@/api/cache';

export const useCityPrayerData = (city: string, isDataLoaded: boolean) => {
    const [prayerData, setPrayerData] = useState<PrayerDataResponse | null>(null);
    const [timings, setTimings] = useState<PrayerTimings | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getCityPrayerData = async () => {
            try {
                setLoading(true);
                const value = await cache.get(city);
                if(value !== undefined) {
                    const data: PrayerDataResponse = JSON.parse(value);
                    setPrayerData(data);
                    setTimings(data.data.timings);
                } else {
                    console.log(`Cached data for ${city} does not exists!`);
                    setError(true);
                }
            } catch (error) {
                setError(true); 
                console.log(`Failed to retrieve cached data for ${city}:`, error);
            } finally {
                setLoading(false);
            }
        }

        getCityPrayerData();
    }, [city, isDataLoaded]);

    return { prayerData, timings, loading, error };
}; 