import { Timestamp } from "firebase/firestore";

export const get_today = () => new Date();

export function formatRelativeDate(timestamp: Timestamp): string {
    const now = new Date();

    const date = timestamp.toDate(); // or new Date(timestamp.seconds * 1000)

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.log(date);
        throw new Error("Invalid date passed");
    }

    const timeDiff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Difference in days
  
    // Check if the date is today
    if (daysDiff === 0) {
      return "Today";
    }
  
    // Check if the date is yesterday
    if (daysDiff === 1) {
      return "Yesterday";
    }
  
    // Check if the date is within this week
    const currentWeek = Math.floor(now.getDate() / 7);
    const targetWeek = Math.floor(date.getDate() / 7);
    if (daysDiff < 7) {
      return "This week";
    }
  
    // Check if the date is within last month
    const currentMonth = now.getMonth();
    const targetMonth = date.getMonth();
    if (currentMonth === targetMonth + 1 || (currentMonth === 0 && targetMonth === 11)) {
      return "Last month";
    }
  
    // Return a specific date
    return date.toDateString();
  }