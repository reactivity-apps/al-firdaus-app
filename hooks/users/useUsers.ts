import { useState, useEffect } from 'react';

export interface User {
    id: string;
    email: string;
    fullName: string;
    emailVerified: boolean;
    createdAt: string;
    lastLoginAt: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Mock data for development
        const mockUsers: User[] = [
            {
                id: '1',
                email: 'user1@example.com',
                fullName: 'John Doe',
                emailVerified: true,
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString()
            },
            {
                id: '2',
                email: 'user2@example.com',
                fullName: 'Jane Smith',
                emailVerified: false,
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString()
            }
        ];

        setUsers(mockUsers);
        setLoading(false);
    }, []);

    return { users, loading, error };
}; 