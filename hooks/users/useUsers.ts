import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/clientApp';

export interface User {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
    status: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const snapshot = await getDocs(collection(db, 'users'));
                
                const usersList = snapshot.docs.map((docSnapshot) => {
                    const userData = docSnapshot.data();
                    
                    const user: User = {
                        id: docSnapshot.id,
                        email: userData.email || 'Not set',
                        fullName: userData.fullName || userData.displayName || 'Not set',
                        createdAt: userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt || new Date().toISOString(),
                        status: userData.status || 'user'
                    };

                    return user;
                });

                // Sort users by status (admin > user), then by name
                const sortedUsers = usersList.sort((a, b) => {
                    if (a.status === 'admin' && b.status !== 'admin') return -1;
                    if (a.status !== 'admin' && b.status === 'admin') return 1;
                    return a.fullName.localeCompare(b.fullName);
                });

                setUsers(sortedUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};