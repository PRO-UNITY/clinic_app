import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { registerUser } from '../../services/auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }: any) => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = () => {
    const data = {
      phone,
      password,
      groups: 3,
    };
    registerUser(data)
      .then(async (res) => {
        await AsyncStorage.setItem('token', res.access);
        navigation.navigate('Verification');
      })
      .catch((err) => {
        console.log(err);
        console.log(data);
      });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Welcome to Clinic</Text>
        <Text style={styles.subheading}>Let us get to know you better!</Text>
      </View>
      <View style={styles.registerContainer}>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder='Phone Number'
          keyboardType='phone-pad'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder='Password'
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.haveAccountContainer}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              color: '#054A80',
              fontSize: 16,
            }}
          >
            By signing up I agree to Clinic Terms of Services and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 75,
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#054A80',
  },
  subheading: {
    fontSize: 18,
    color: '#979C9E',
    textAlign: 'left',
  },
  // inputs
  registerContainer: {
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#054A80',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#404446',
  },
  linkText: {
    fontSize: 16,
    color: '#FF7360',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
