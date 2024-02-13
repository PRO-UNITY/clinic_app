import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import Modal from 'react-native-modal';
import { grayColor, mainColor } from '../../utils/colors';

const ReviewContentsModal = ({ isVisible, contents, onClose }: any) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>User Comments</Text>
          <ScrollView style={styles.commentsContainer}>
            {contents?.map((comment: any, index: any) => (
              <View key={index} style={styles.commentContainer}>
                <View style={styles.commentIndexContainer}>
                  <Text style={styles.commentIndex}>{index + 1}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    marginTop: 100,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsContainer: {
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: grayColor,
    paddingBottom: 4,
  },
  commentIndexContainer: {
    backgroundColor: mainColor,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentIndex: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  commentText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'stretch',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReviewContentsModal;
