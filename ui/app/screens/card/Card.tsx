import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { mainColor, redColor } from '../../utils/colors';
import Modal from 'react-native-modal';

const Card = () => {
  const { confirmPayment } = useStripe();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { paymentIntent, error } = await confirmPayment('CLIENT_SECRET', {
        // @ts-ignore
        type: 'Card',
      });

      if (error) {
        console.error(error);
        Alert.alert('Payment failed', error.message);
      } else if (paymentIntent) {
        console.log('Success:', paymentIntent);
        Alert.alert('Success', 'Payment successful!');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title='Open Payment Modal'
        onPress={() => setModalVisible(true)}
      />
      {/* @ts-ignore */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Write a Review</Text>

            <CardField
              postalCodeEnabled={true}
              //   @ts-ignore
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={styles.cardField}
            />
            <Pressable
              onPress={handlePayment}
              disabled={loading}
              // @ts-ignore
              style={styles.button}
            >
              <Text style={styles.paymentText}>Make Payment</Text>
            </Pressable>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardFieldContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  additionalFields: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },

  button: {
    marginTop: 20,
    backgroundColor: mainColor,
    padding: 15,
    borderRadius: 8,
  },

  //   new
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
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paymentText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Card;
