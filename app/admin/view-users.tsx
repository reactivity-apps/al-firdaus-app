import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import { useViewUsers } from '@/hooks/users/useViewUsers';
import List from '@/components/List';
import Error from '@/components/Error';
import { globalStyles } from '@/styles/global';
import { capitalizeFirstLetter } from '@/common/utils';

export default function ViewUsers() {
    const { users, loading, error } = useViewUsers();

    const userItems = users.map(user => ({
        label: `${user.status === 'admin' ? ' 👑' : ''} ${user.fullName}`,
        subtext: (
            <>
                Email: {user.email}
                {'\n'}
                Status: {user.status ? capitalizeFirstLetter(user.status) : 'User'}
                {'\n'}
                Last login: {new Date(user.createdAt).toLocaleString()}
            </>
        ),
        link: `/admin/user/${user.id}`
    }));

    if (loading) {
        return (
            <View style={[globalStyles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>User Management</Text>
                <Text style={globalStyles.subHeader}>
                    View all users in the system.
                </Text>

                {error ? (
                    <Error error={error} />
                ) : users.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No users found</Text>
                        <Text style={styles.emptySubText}>There are currently no users registered yet.</Text>
                    </View>
                ) : (
                    <List 
                        title="All Users" 
                        items={userItems}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
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
