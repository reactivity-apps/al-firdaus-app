import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/clientApp";


// Define the type for announcements
interface Announcement {
    title: string;
    message: string;
    date: Timestamp;
  }

export const useAnnouncements = (refreshing: boolean) => {
    const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAnnouncements = async () => {
        try {
            const data = await getDocs(collection(db, "announcements"));
            const announcementsList: Array<Announcement> = data.docs.map((item) => ({
            title: item.get("title"),
            message: item.get("message"),
            date: item.get("createdAt"),
            }));
            
            announcementsList.sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());

            setAnnouncements(announcementsList);
        } catch (error) {
            console.log(`Error fetching announcements: ${error}`);
        } finally {
            setLoading(false);
        }
        };

        getAnnouncements();
    }, [refreshing]);

    return { announcements, loading }
}