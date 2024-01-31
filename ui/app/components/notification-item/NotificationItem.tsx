import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { mainColor } from '../../utils/colors';
import { NotificationItemType } from '../../types/notification/notification';
import { markAsRead } from '../../services/notification/notification';

const NotificationItem: React.FC<NotificationItemType> = ({
  sender,
  isSeen,
  date,
  content,
  notificationId,
  navigation,
}) => {
  const handleSeenNotification = () => {
    Alert.alert(
      'Mark as Read',
      'Are you sure you want to mark this notification as read?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            markAsRead(notificationId).then(() => {
              navigation.goBack();
            });
          },
        },
      ]
    );
  };

  return (
    <Pressable onPress={handleSeenNotification} style={styles.notificationItem}>
      <Text style={styles.sender}>{sender}</Text>
      <Text style={styles.seen}>{isSeen}</Text>
      <Text style={styles.time}>{date}</Text>
      <Text style={styles.content}>{content}</Text>
    </Pressable>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    gap: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seen: {
    fontSize: 12,
    color: mainColor,
    marginBottom: 8,
    fontWeight: 'bold',
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
