import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

interface Card {
  type: string;
  number: string;
  cvv: string;
  expiryDate: string;
}

const PaymentSettings: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardType, setCardType] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string>('');

  const cardRegex = /^[0-9]{16}$/;
  const cvvRegex = /^[0-9]{3,4}$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

  const addCard = () => {
    if (
      !cardRegex.test(cardNumber) ||
      cardType.trim() === '' ||
      !cvvRegex.test(cvv) ||
      !expiryDateRegex.test(expiryDate)
    ) {
      setError('Please enter valid card details.');
      return;
    }

    setCards([
      ...cards,
      {
        type: cardType,
        number: cardNumber,
        cvv: cvv,
        expiryDate: expiryDate,
      },
    ]);
    setCardNumber('');
    setCardType('');
    setCvv('');
    setExpiryDate('');
    setError('');
  };

  const removeCard = (index: number) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Settings</Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter card number'
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter card type (e.g. Visa, Mastercard)'
          value={cardType}
          onChangeText={setCardType}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter CVV'
          value={cvv}
          onChangeText={setCvv}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter expiry date (MM/YYYY)'
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCard}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => removeCard(index)}
          >
            <Text
              style={styles.cardText}
            >{`${item.type} - ${item.number}`}</Text>
            <Text style={styles.cardText}>{`CVV: ${item.cvv}`}</Text>
            <Text
              style={styles.cardText}
            >{`Expiry Date: ${item.expiryDate}`}</Text>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  removeButtonText: {
    color: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PaymentSettings;
