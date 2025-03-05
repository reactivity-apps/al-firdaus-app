import { Timestamp } from "firebase/firestore";

export const get_today = () => new Date();

export function formatRelativeDate(timestamp: Timestamp): string {
  const now = new Date();
  const date = timestamp.toDate(); // Convert Firestore timestamp to JS Date

  if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date:", date);
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
