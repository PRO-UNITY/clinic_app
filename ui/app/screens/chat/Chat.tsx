import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  blueColor,
  grayColor,
  mainColor,
  yellowColor,
} from '../../utils/colors';
import {
  getChatConversationById,
  putChatConversationById,
} from '../../services/chat/chat';
import { clearInputs } from '../../utils/clearInputs';

const Chat = ({ route }: any) => {
  const [user, setUser] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false); // New s
  const pageRef = useRef<number>(1);

  useEffect(() => {
    getChatConversationById(route.params.userId, pageRef.current).then(
      (res: any) => {
        console.log(res);
        setMessages(res.results);
      }
    );
  }, [route.params.userId]);

  const loadNextPage = async () => {
    if (loading || loadingNextPage) return;
    setLoadingNextPage(true);
    try {
      const nextPage = pageRef.current + 1;
      const response = await getChatConversationById(
        route.params.userId,
        nextPage
      );
      if (response.next === null) {
        console.log('End of Chat');
        return;
      } else {
        const newMessages = response.results.filter((newMessage: any) => {
          return !messages.some(
            (existingMessage) => existingMessage.id === newMessage.id
          );
        });
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        pageRef.current = nextPage;
      }
    } catch (error) {
      return;
    } finally {
      setLoadingNextPage(false);
    }
  };

  const handleSendMessage = () => {
    const newMessage = {
      text: inputText,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    putChatConversationById(route.params.userId, newMessage);
    clearInputs([setInputText]);
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isSenderDoctor = item.sender_type === 'doctor';
    const isSenderPatient = item.sender_type === 'patient';

    return (
      <View
        style={[
          styles.messageContainer,
          isSenderDoctor ? styles.doctorMessage : styles.userMessage,
          isSenderPatient ? styles.patientMessage : styles.userMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  const reversedMessages = [...messages].reverse();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Chat {user.first_name ? user.first_name : user.phone}
        </Text>
      </View>

      <FlatList
        data={reversedMessages}
        renderItem={renderMessage}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.5}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const reachedEnd =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height;
          if (reachedEnd) {
            loadNextPage();
          }
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Type a message'
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  header: {
    height: 50,
    backgroundColor: mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#006699',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: yellowColor,
  },
  patientMessage: {
    alignSelf: 'flex-start',
    backgroundColor: grayColor,
  },
  doctorMessage: {
    alignSelf: 'flex-end',
    backgroundColor: blueColor,
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: mainColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
