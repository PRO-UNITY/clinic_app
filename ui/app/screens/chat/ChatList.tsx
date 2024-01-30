import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { getChatRooms } from '../../services/chat/chat';

const ChatList = ({ navigation }: any) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [page, setPage] = useState(1);

  const fetchChatRooms = async () => {
    const response = await getChatRooms(page);

    const newChatRooms = response.results;
    setChatRooms((prevChatRooms) =>
      page === 1 ? newChatRooms : [...prevChatRooms, ...newChatRooms]
    );
    setPage((prevPage) => (response.next ? prevPage + 1 : prevPage));
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const renderUserItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('Chat', { userId: item.id })}
    >
      <Image source={{ uri: item.initiator.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{`${item.initiator.first_name} `}</Text>
        <Text style={styles.lastMessage}>{item.last_message}</Text>
      </View>
      <Text style={styles.time}></Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chatRooms}
      renderItem={renderUserItem}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
      onEndReached={fetchChatRooms}
      onEndReachedThreshold={0.1}
    />
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#555',
  },
  time: {
    color: '#777',
  },
});
