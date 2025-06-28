import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";

interface UserContextType {
  user: User | null;
  status: "user" | "admin";
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user status when user changes
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (user) {
        try {
          const usersDoc = await getDoc(doc(db, "users", user.uid));

          if (usersDoc.exists()) {
            setStatus(usersDoc.data().status);
          } else {
            console.log("No status document found for user.");
          }
        } catch (error) {
          console.error("Error fetching user status:", error);
        }
      }
    };

    fetchUserStatus();
  }, [user]);

  const value = {
    user,
    status,
    loading,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};