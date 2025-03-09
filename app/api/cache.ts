// cache.ts
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new Cache({
  namespace: "al-firdaus-app",
  policy: {
    maxEntries: 50000, // Limit number of entries
    stdTTL: 0, // 0 means unlimited time-to-live
  },
  backend: AsyncStorage,
});

export default cache;
