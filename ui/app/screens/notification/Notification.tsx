import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const NotificationItem = ({ sender, time, date, content }: any) => (
  <View style={styles.notificationItem}>
    <Text style={styles.sender}>{sender}</Text>
    <Text style={styles.time}>{time}</Text>
    <Text style={styles.time}>{date}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const Notification = () => {
  const notifications = [
    {
      id: '1',
      sender: 'John Doe',
      date: '2024-01-01',
      time: '10:30 AM',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      id: '2',
      sender: 'Jane Smith',
      date: '2024-01-01',
      time: '11:45 AM',
      content: 'Consectetur adipiscing elit.',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            sender={item.sender}
            date={item.date}
            time={item.time}
            content={item.content}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
});

export default Notification;
