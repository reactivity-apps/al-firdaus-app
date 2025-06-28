import React, { useEffect, useState } from "react";
import { locations } from "@/types/prayer";
import { fetchHaramWeatherDetails, fetchPrayerTimings } from "@/api/prayerDataApi";
import cache from "@/api/cache";

export const usePrayerDataCache = () => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cachePrayerRelatedData = async () => {
            try {
                setError(null);
                // Check last cached data
                const lastCacheTimeString = await cache.get('lastPrayerDataCacheTime');
                const currentTime = new Date().getTime();
                const oneDayInMs = 24 * 60 * 60 * 1000;
                let shouldRefreshCache = true;
                
                if (lastCacheTimeString) {
                    const lastCacheTime = parseInt(lastCacheTimeString);
                    shouldRefreshCache = (currentTime - lastCacheTime) >= oneDayInMs;
                }

                if (!shouldRefreshCache) {
                    console.log('Prayer data cache is less than a day old. Skipping refresh.');
                    setIsDataLoaded(true);
                    setLoading(false);
                    return;
                }
                
                console.log('Refreshing prayer data cache...');
                
                // Fetch and cache data for all locations in parallel
                await Promise.all(locations.map(async (location) => {
                    try {
                        // Fetch both weather and prayer data in parallel
                        const [weatherData, prayerTimings] = await Promise.all([
                            fetchHaramWeatherDetails(location.lat, location.long),
                            fetchPrayerTimings(location.address)
                        ]);
                        
                        if (!weatherData.coord) {
                            throw new Error(weatherData.message);
                        }
                        
                        await cache.set(`${location.name}_weather`, JSON.stringify(weatherData));
                        
                        if (!prayerTimings || prayerTimings.code !== 200) {
                            throw new Error(`Failed to fetch prayer timings for ${location.name}`);
                        }
                        
                        await cache.set(location.name, JSON.stringify(prayerTimings));
                        
                    } catch (error) {
                        console.log(`Error processing data for ${location.name}:`, error);
                        await cache.set(location.name, "failed").catch(console.log);
                    }
                }));

                // After successfully updating the cache, update the timestamp
                await cache.set('lastPrayerDataCacheTime', currentTime.toString())
                    .catch(err => console.log('Error saving cache timestamp:', err));
                
            } catch (error) {
                console.log('Error in cachePrayerRelatedData:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setIsDataLoaded(true);
                setLoading(false);
            }
        };
        
        cachePrayerRelatedData();
    }, []);

    return { isDataLoaded, loading, error };
};