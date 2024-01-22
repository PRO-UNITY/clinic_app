import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ForgotPassword = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');

  const handleForgotPassword = () => {
    console.log('Phone for password reset:', phone);
    navigation.navigate('Verification');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address below to receive a password reset link.
      </Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder='Phone number'
        keyboardType='number-pad'
        autoCapitalize='none'
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: 'gray',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#054A80',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
