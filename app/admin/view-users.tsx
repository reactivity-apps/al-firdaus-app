import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import { useUsers } from '@/hooks/users/useUsers';
import List from '@/components/List';
import { globalStyles } from '@/styles/global';

export default function ViewUsers() {
    const { users, loading, error } = useUsers();

    if (loading) {
        return (
            <View style={[globalStyles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={globalStyles.container}>
                    <Text style={globalStyles.header}>User Management</Text>
                    <Text style={globalStyles.subHeader}>
                        View all users in the system.
                    </Text>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Something went wrong</Text>
                        <Text style={styles.emptySubText}>{error || 'Unknown error'}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    if (users.length === 0) {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={globalStyles.container}>
                    <Text style={globalStyles.header}>User Management</Text>
                    <Text style={globalStyles.subHeader}>
                        View all users in the system.
                    </Text>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No users found</Text>
                        <Text style={styles.emptySubText}>There are currently no users registered yet.</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    const userItems = users.map(user => ({
        label: user.fullName,
        subtext: (
            <>
                {user.email}
                {'\n'}
                {user.emailVerified ? '✓ Email Verified' : '⚠ Email Not Verified'}
                {'\n'}
                Last login: {new Date(user.lastLoginAt).toLocaleString()}
            </>
        ),
        link: `/admin/user/${user.id}`
    }));

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>User Management</Text>
                <Text style={globalStyles.subHeader}>
                    View and manage all users in the system. Click on a user to view their details and manage their account.
                </Text>

                <List 
                    title="All Users" 
                    items={userItems}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    emptyContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});
