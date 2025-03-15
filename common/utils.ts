import { Timestamp } from "firebase/firestore";

export const get_today = () => new Date();

export function formatRelativeDate(timestamp: Timestamp): string {
  const now = new Date();
  const date = timestamp.toDate(); // Convert Firestore timestamp to JS Date

  if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.log("Invalid date:", date);
      throw new Error("Invalid date passed");
  }

  // Get midnight boundaries for today and yesterday
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(todayStart.getDate() - 1);

  if (date >= todayStart) {
      return "today";
  }

  if (date >= yesterdayStart) {
      return "yesterday";
  }

  // Check if the date is within the current week
  const startOfWeek = new Date(todayStart);
  startOfWeek.setDate(todayStart.getDate() - todayStart.getDay()); // Start of the week (Sunday)

  if (date >= startOfWeek) {
      return "this week";
  }

  // Check if the date is within last month
  const startOfLastMonth = new Date(todayStart);
  startOfLastMonth.setMonth(todayStart.getMonth() - 1, 1); // First day of last month

  if (date >= startOfLastMonth) {
      return "last month";
  }

  // Default to full date string
  return date.toDateString();
}


export function convertTo12HourFormat(time: string) {
    // Split the input time into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);
    
    // Determine AM/PM and adjust the hour for 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert 0 hours to 12 (midnight)
    
    // Return the formatted time
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const getImageForLocation = (locationName: string) => {
    // Using a switch statement to map location names to their respective images
    switch(locationName) {
        case 'Makkah':
            return require('../assets/images/makkah.jpg');
        case 'Madina':
            return require('../assets/images/madina.jpg');
        // Add more cases as needed for other locations
        default:
            // Fallback image if no match is found
            return require('../assets/images/makkah.jpg');
    }
};