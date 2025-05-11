import React,{ useState, useEffect } from "react";
import { globalStyles } from "@/styles/global";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { PrayerDataResponse, Location, locations, PrayerTimings } from "@/types/prayer";
import { Link } from "expo-router";
import cache from "@/api/cache";
import PrayerTimes from "./PrayerTimes";
import { LinearGradient } from 'expo-linear-gradient';
import { getImageForLocation } from "@/common/utils";
import { fetchHaramWeatherDetails, fetchPrayerTimings } from "@/api/prayerDataApi";

const cardHeight = 450; // Needed for carousel, will break otherwise

// FIXME: Carousel loads on start without indicator
function PrayerCarousel() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Loads and caches prayer data once a day
    useEffect(() => {
        const cachePrayerRelatedData = async () => {
            // Check last cached data
            const lastCacheTimeString = await cache.get('lastPrayerDataCacheTime');
            const currentTime = new Date().getTime();
            const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            let shouldRefreshCache = true;
            
            // If cache data, check if more than a day
            if (lastCacheTimeString) {
                const lastCacheTime = parseInt(lastCacheTimeString);
                shouldRefreshCache = (currentTime - lastCacheTime) >= oneDayInMs;
            }
            
            // If less than a day, skip refresh
            if (!shouldRefreshCache) {
                console.log('Prayer data cache is less than a day old. Skipping refresh.');
                setIsDataLoaded(true);
                return;
            }
            
            console.log('Refreshing prayer data cache...');
            
            // Otherwise, proceed with fetching and caching data
            for(const location of locations){
                try {
                    const weatherData = await fetchHaramWeatherDetails(location.lat, location.long);
                    
                    if (!weatherData.coord) {
                    throw new Error(weatherData.message);
                    }
                    console.log(`Weather data fetched for ${location.name}`);
                    
                    // Cache the weather data
                    await cache.set(`${location.name}_weather`, JSON.stringify(weatherData))
                    .catch((err) => {
                        console.log(`Error caching weather data for ${location.name}:`, err);
                    });
                } catch (error) {
                    console.log(`Error fetching weather data for ${location.name}:`, error);
                }
        
                try {
                    const prayerTimings = await fetchPrayerTimings(location.address);
                    if (!prayerTimings || prayerTimings.code !== 200) {
                    throw new Error(`Failed to fetch prayer timings for ${location.name}`);
                    }
            
                    await cache.set(location.name, JSON.stringify(prayerTimings))
                    .catch(() => {
                        throw Error();
                    });
            
                } catch (error) {
                    console.log(`Error caching data for ${location.name}:`, error);
                    await cache.set(location.name, "failed").catch(console.log);
                } 
            }
            
            // After successfully updating the cache, update the timestamp
            await cache.set('lastPrayerDataCacheTime', currentTime.toString())
                .catch(err => console.log('Error saving cache timestamp:', err));

            setIsDataLoaded(true);
        };
        
        cachePrayerRelatedData();
    }, []);

    const [containerWidth, setContainerWidth] = React.useState(0); // Track element width   
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
        });
    };

    return (
        <View 
            style={styles.container}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width); // Use width of container to set carousel width
            }}
        >
            {containerWidth > 0 && (
                <>
                <Carousel
                    ref={ref}
                    width={containerWidth} 
                    height={cardHeight} // Maintain height
                    data={locations}
                    onProgressChange={progress}
                    renderItem={({ item, index }) => <PrayerCard location={item} isDataLoaded={isDataLoaded} />}
                    loop={false}
                    style={{ alignSelf: "center" }}
                />

                <Pagination.Basic
                    progress={progress}
                    data={locations}
                    dotStyle={styles.dot}
                    containerStyle={styles.paginationContainer}
                    onPress={onPressPagination}
                />
                </>
            )}
        </View>
    );
}

const PrayerCard = ({ location, isDataLoaded }: { location: Location, isDataLoaded: boolean }) => {
    const [prayerData, setPrayerData] = useState<PrayerDataResponse | null>(null);
    const [timings, setTimings] = useState<PrayerTimings | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getCityPrayerData = async (city: string) => {
            try {
                setLoading(true);
                const value = await cache.get(city);
                if(value !== undefined) {
                    const data: PrayerDataResponse = JSON.parse(value);
                    setPrayerData(data)
                    setTimings(data.data.timings);
                } else {
                    console.log(`Cached data for ${city} does not exists!`);
                    setError(true);
                }
            } catch (error) {
                setError(true); 
                console.log(`Failed to retrive cached data for ${city}:`, error);
            } finally {
                setLoading(false);
            }
        }

        getCityPrayerData(location.name);
    },[location, isDataLoaded]);

    const imageSource = getImageForLocation(location.name);

    return (
        <View style={styles.card}>
            <ImageBackground
                source={imageSource}
                style={styles.headerImageBackground}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                    style={styles.gradient}
                >
                    <View style={styles.headerContent}>
                        <Text style={styles.locationName}>{location.name}</Text>
                        <View style={styles.dateGroup}>
                            {!error ? (
                                loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <>
                                        <Text style={styles.dateText}>{prayerData?.data.date.gregorian.month.en} {prayerData?.data.date.gregorian.day}, {prayerData?.data.date.gregorian.year}</Text>
                                        <Text style={styles.dateText}>{prayerData?.data.date.hijri.month.en} {prayerData?.data.date.hijri.day}, {prayerData?.data.date.hijri.year}</Text>
                                    </>
                                )
                            ) : (
                                <Text style={[styles.errorText, styles.dateText]}>Network error: cannot load current dates!</Text>
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="small" color="black" />
                ) : !error ? (
                    <>
                        <PrayerTimes timings={timings!} />

                        {/* Needed for spacing */}
                        <View style={styles.buffer}></View>

                        <Link href={`/extended-prayer-view?city=${location.name}&address=${location.address}`} asChild>
                            <TouchableOpacity style={globalStyles.outlinedButton}>
                                <Text>See More Information</Text>
                            </TouchableOpacity>
                        </Link>
                    </>
                ) : (
                    <Text style={[styles.errorText, { alignSelf: "center" }]}>Network error: cannot load current prayer times!</Text>
                )}
            </View>
        </View>
    );
};

export default PrayerCarousel;

const styles = StyleSheet.create({
    // Carousel
    container: {
        marginBottom: 30,
    },
    dot: {
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 50,
    },
    paginationContainer: {
        gap: 5,
        marginTop: 10,
    },
    card: {
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 10,
        flexDirection: "column",
        height: cardHeight, // Needed for carousel, will break otherwise
        borderWidth: 1,
        borderColor: "#CDCBCB",
        overflow: "hidden", 
    },
    errorText: {
        color: "red"
    },
    
    // Prayer Card
    // Header
    headerImageBackground: {
        height: 150, // Adjust height as needed
        width: "100%",
        borderTopLeftRadius: 8, // Round top-left corner
        borderTopRightRadius: 8, // Round top-right corner
        overflow: "hidden",
    },
    gradient: {
        flex: 1,
        justifyContent: "flex-end", // Pushes content to bottom of gradient
    },
    headerContent: {
        flex: 1,
        flexDirection: "row", // Arrange children horizontally
        justifyContent: "space-between", // Push children to opposite sides
        alignItems: "flex-start", // Align children to the top
        padding: 15,
        paddingTop: 15,
    },
    locationName: {
        fontSize: 34,
        fontWeight: "bold",
        color: "white", // For better visibility on the gradient background
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        alignSelf: "flex-end", 

    },
    dateGroup: {
        alignItems: "flex-end", // Ensures text is aligned to the right
        marginBottom: 8, 
    },
    dateText: {
        color: "white", // For better visibility on the gradient background
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },

    // Content
    content: {
        flexGrow: 1, // Allow content to grow
        flexDirection: "column",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 15,
        justifyContent: "flex-end", // Pushes prayer times to bottom
    },
    reciterInfo: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
        width: "90%"
    },
    reciterIcon: {
        width: 20,
        height: 20, 
        backgroundColor: "#EDEDED",
        borderRadius: 10
    },
    nextPrayer: {
        marginBottom: 15,
        flexDirection: "row",
        borderRadius: 5,
        flexWrap: "wrap", // Allow the items to wrap
    },
    buffer: {
        marginVertical: 5
    }
});

