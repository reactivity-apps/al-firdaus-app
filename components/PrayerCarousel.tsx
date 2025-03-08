import { globalStyles } from "@/common/style";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(3).keys()];
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
                    data={data}
                    onProgressChange={progress}
                    renderItem={({ index }) => <PrayerCard />}
                    loop={false}
                    style={{ alignSelf: "center" }}
                />

                <Pagination.Basic
                    progress={progress}
                    data={data}
                    dotStyle={styles.dot}
                    containerStyle={styles.paginationContainer}
                    onPress={onPressPagination}
                />
                </>
            )}
        </View>
    );
}

const PrayerTimes = () => {
    const lastRowItemStyle = {...styles.prayerItemContainer, ...styles.lastRow};
    return (
        <View style={styles.prayerTimesContainer}>
            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={styles.prayerItemContainer}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
            </View>

            <View style={lastRowItemStyle}>
                <Text style={styles.prayerName}>Fajr</Text>
                <Text style={styles.prayerTime}>6:50am</Text>
                
            </View>
        </View>
    );
}

const PrayerCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.dateGroup}>
                    <Text>Rajab 20, 1445</Text>
                    <Text>January 20, 2025</Text>
                </View>
                <Text style={styles.locationName}>Madina</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.reciterInfo}>
                    <View style={styles.reciterIcon}></View>
                    <Text>Sheikh Abdul Rahman al-Sudais</Text>
                </View>
                <PrayerTimes />
                <TouchableOpacity style={globalStyles.outlinedButton}>
                    <Text>See More Information</Text>
                </TouchableOpacity>
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
        marginBottom: 15
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

