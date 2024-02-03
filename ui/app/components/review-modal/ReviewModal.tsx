import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

import { TextInput } from 'react-native-gesture-handler';
import { mainColor, redColor } from '../../utils/colors';
import { postReview } from '../../services/review/review';

const ReviewModal = ({ doctorId, isVisible, onClose }: any) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSendReview = () => {
    const data = {
      rating: rating,
      content: content,
      doctor: doctorId,
    };
    postReview(data).then(() => {
      Alert.alert('Review Sent', 'Your review has been sent successfully');
    });
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Write a Review</Text>

          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => setRating(rating)}
            fullStarColor={'#FFD700'}
            starSize={30}
          />

          <TextInput
            style={styles.reviewInput}
            placeholder={'Review Content'}
            onChangeText={(text) => setContent(text)}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendReview}
          >
            <Text style={styles.sendButtonText}>Send Review</Text>
          </TouchableOpacity>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewInput: {
    borderColor: 'gray',
    marginBottom: 16,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    padding: 8,
    alignSelf: 'stretch',
  },
  sendButton: {
    backgroundColor: mainColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'stretch',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: redColor,
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

export default ReviewModal;
