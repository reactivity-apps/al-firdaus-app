// cache.ts
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new Cache({
  namespace: "al-firdaus-app",
  policy: {
    maxEntries: 50000, // Limit number of entries
    stdTTL: 86400, // 86400 means 1 day
  },
  backend: AsyncStorage,
});

export default cache;
