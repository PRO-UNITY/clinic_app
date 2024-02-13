import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { mainColor } from '../../utils/colors';

const Payment = () => {
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    try {
      const { paymentIntent, error } = await confirmPayment(
        'client_secret_from_backend'
      );
      if (error) {
        console.error(error);
      } else if (paymentIntent) {
        console.log(paymentIntent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Payment to doctor</Text>
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: 'https://www.debitcard.nl/wp-content/uploads/visa-of-mastercard.jpg',
          }}
          style={styles.image}
        />
        <CardField
          postalCodeEnabled={false}
          //   @ts-ignore
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.cardStyle}
          style={styles.cardField}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
      <View style={styles.additionalInfo}>
        <Text style={styles.additionalInfoText}>
          Your payment information is secure.
        </Text>
        <Text style={styles.additionalInfoText}>
          We do not store any card details.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Payment' onPress={handlePayment} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: mainColor,
  },
  buttonContainer: {
    marginTop: 20,
  },
  cardStyle: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 10,
  },
  cardField: {
    height: 50,
    marginVertical: 10,
  },
  image: {
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  additionalInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  additionalInfoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  footerLink: {
    color: mainColor,
    fontSize: 16,
    paddingBottom: 48,
  },
});

export default Payment;
