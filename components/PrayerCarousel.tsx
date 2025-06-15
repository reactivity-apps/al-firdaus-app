import React,{ useState, useRef } from "react";
import { globalStyles } from "@/styles/global";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Location, locations } from "@/types/prayer";
import { Link } from "expo-router";
import PrayerTimes from "./PrayerTimes";
import { LinearGradient } from 'expo-linear-gradient';
import { getImageForLocation } from "@/common/utils";
import { usePrayerDataCache } from "@/hooks/prayer/usePrayerDataCache";
import { useCityPrayerData } from '@/hooks/prayer/useCityPrayerData';

const cardHeight = 450; // Needed for carousel, will break otherwise

const PrayerCard = ({ location, isDataLoaded }: { location: Location, isDataLoaded: boolean }) => {
    const { prayerData, timings, loading, error } = useCityPrayerData(location.name, isDataLoaded);
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

const PrayerCarousel = () => {
    const { isDataLoaded, isLoading } = usePrayerDataCache();
    const [containerWidth, setContainerWidth] = useState(0);
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };
    
    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Loading prayer times...</Text>
            </View>
        );
    }
    
    return (
        <View 
            style={styles.container}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
        >
            {containerWidth > 0 && (
                <>
                <Carousel
                    ref={ref}
                    width={containerWidth} 
                    height={cardHeight}
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
        padding: 6
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
    },
    loadingContainer: {
        height: cardHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CDCBCB",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
});

