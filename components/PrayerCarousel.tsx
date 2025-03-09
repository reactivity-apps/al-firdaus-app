import React,{ useState, useEffect } from "react";
import { globalStyles } from "@/common/style";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { 
    fetchPrayerTimings, 
    // fetchReciter, 
    PrayerTimingsResponse 
} from "@/common/fetchPrayerData";
import { convertTo12HourFormat } from "@/common/utils";

type Location = {
    name: string;
    address: string;
};

type PrayerTimings = {
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

const locations: Location[] = [
    { name: "Makkah", address: "Al Haram, Makkah 24231, Saudi Arabia" },
    { name: "Madina", address: "Al Haram, Madinah 42311, Saudi Arabia" },
    { name: "Hilliard", address: "Davidson Rd, Hilliard, OH" }
];
const cardHeight = 455; // Needed for carousel, will break otherwise

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
                    height={460} // Maintain height
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

const PrayerTimes = ({ timings }: PrayerTimings) => {
    const lastRowItemStyle = { ...styles.prayerItemContainer, ...styles.lastRow };
    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    if (!timings) {
        return <Text style={styles.errorText}>Network error: cannot load prayer times!</Text>;
    }

    return (
        <View style={styles.prayerTimesContainer}>
            {prayerNames.map((prayerName, index) => {
                const time = timings[prayerName as keyof typeof timings];

                // Apply the last row style to the last item
                const prayerItemStyle = index === prayerNames.length - 1 ? lastRowItemStyle : styles.prayerItemContainer;

                return (
                    <View key={prayerName} style={prayerItemStyle}>
                        <Text style={styles.prayerName}>{prayerName}</Text>
                        <Text style={styles.prayerTime}>{convertTo12HourFormat(time)}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const PrayerCard = ({ location }: { location: Location }) => {
    const [prayerData, setPrayerData] = useState<PrayerTimingsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const prayerTimings = await fetchPrayerTimings(location.address);

                if (prayerTimings?.code !== 200) {
                    setError(true);
                } else {
                    setPrayerData(prayerTimings);
                    setError(false); // Reset error state on success
                }
            } catch (error) {
                setError(true); // Fix incorrect setError call
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location]);

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
                        <PrayerTimes timings={prayerData?.data.timings} />
                        <TouchableOpacity style={globalStyles.outlinedButton}>
                            <Text>See More Information</Text>
                        </TouchableOpacity>
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

    // Prayer Times
    prayerTimesContainer: {
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#CDCBCB",
    },
    prayerItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#CDCBCB",
        justifyContent: "space-between", // Pushes time to left and name to right
    },
    lastRow: {
        borderBottomWidth: 0, // Removes border from the last row
    },
    prayerName: {
        fontWeight: "bold",
        fontSize: 15
    },
    prayerTime: {
        color: "#515151",
        fontSize: 15,
    }   
});

