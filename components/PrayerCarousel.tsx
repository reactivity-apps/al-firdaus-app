import React,{ useState, useEffect } from "react";
import { globalStyles } from "@/common/style";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { PrayerDataResponse, Location, getTimeUntilNextPrayer, locations } from "@/types/prayer";
import { Link } from "expo-router";
import cache from "@/api/cache";
import PrayerTimes from "./PrayerTimes";

const cardHeight = 510; // Needed for carousel, will break otherwise

// FIXME: Carousel lags on load
function PrayerCarousel() {
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
                    renderItem={({ item, index }) => <PrayerCard location={item} />}
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


const PrayerCard = ({ location }: { location: Location }) => {
    const [prayerData, setPrayerData] = useState<PrayerDataResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getCityPrayerData = async (city: string) => {
            try {
                setLoading(true);
                const value = await cache.get(city);
                if(value !== undefined) {
                    const data: PrayerDataResponse = JSON.parse(value);
                    setPrayerData(data);
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
    },[location]);

    const timings = prayerData?.data.timings;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.dateGroup}>
                    {!error ? (
                        loading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <>
                                <Text>{prayerData?.data.date.gregorian.month.en} {prayerData?.data.date.gregorian.day}, {prayerData?.data.date.gregorian.year}</Text>
                                <Text>{prayerData?.data.date.hijri.month.en} {prayerData?.data.date.hijri.day}, {prayerData?.data.date.hijri.year}</Text>
                            </>
                        )
                    ) : (
                        <Text style={styles.errorText}>Network error: cannot load current dates!</Text>
                    )}
                </View>
                <Text style={styles.locationName}>{location.name}</Text>
            </View>
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="small" color="black" />
                ) : !error ? (
                    <>
                        <View style={styles.reciterInfo}>
                            <View style={styles.reciterIcon}></View>
                            <Text>Current Imam: Sheikh Abdul Rahman al-Sudais</Text>
                        </View>

                        <PrayerTimes timings={timings} />

                        {/* Needed for spacing */}
                        <View style={styles.nextPrayer}>
                            <Text>Next Prayer In:</Text>
                            <Text>{getTimeUntilNextPrayer(timings)}</Text>
                        </View>

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
        borderRadius: 8,
        flexDirection: "column",
        height: cardHeight // Needed for carousel, will break otherwise
    },
    errorText: {
        color: "red"
    },
    
    // Prayer Card
    // Header
    header: {
        flexDirection: "column", // Stack location and dateGroup vertically
        backgroundColor: "#e8e8e8",
        padding: 15,
        paddingTop: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: "relative", // Allows precise control if needed
    },
    locationName: {
        fontSize: 34,
        fontWeight: "bold",
    },
    dateGroup: {
        alignSelf: "flex-end", // Moves the date to the top right
        alignItems: "flex-end", // Ensures text is aligned to the right
        marginBottom: 8, 
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
        padding: 15,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start", 
        borderWidth: 1,
        borderColor: "#CDCBCB",
        borderRadius: 5,
        flexWrap: "wrap", // Allow the items to wrap
    },
});

