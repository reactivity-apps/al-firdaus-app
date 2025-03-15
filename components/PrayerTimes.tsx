import { PrayerTimings, getNextPrayer, prayerNames } from "@/types/prayer";
import { convertTo12HourFormat } from "@/common/utils";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrayerTimes = ({ timings }: { timings: PrayerTimings }) => {
    if (!timings) {
        return;
    }

    const nextPrayer = getNextPrayer(timings);

    return (
        <View style={styles.prayerTimesContainer}>
            {prayerNames.map((prayerName, index) => {
                const time = timings[prayerName as keyof typeof timings];
                const isNextPrayer = prayerName === nextPrayer;

                return (
                    <View
                        key={prayerName}
                        style={[
                            styles.prayerItemContainer,
                            index === prayerNames.length - 1 && styles.lastRow,
                        ]}>
                        <Text style={[styles.prayerName, isNextPrayer && styles.nextPrayer]}>{prayerName}</Text>
                        <Text style={[styles.prayerTime, isNextPrayer && styles.nextPrayer]}>
                            {convertTo12HourFormat(time)}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default PrayerTimes;

const styles = StyleSheet.create({
    prayerTimesContainer: {
        flexDirection: "column",
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
        justifyContent: "space-between",
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    prayerName: {
        fontSize: 15,
    },
    nextPrayer: {
        fontWeight: "bold",
    },
    prayerTime: {
        color: "#515151",
        fontSize: 15,
    },
    errorText: {
        color: "red",
        alignSelf: "center",
        padding: 15,
    },
})