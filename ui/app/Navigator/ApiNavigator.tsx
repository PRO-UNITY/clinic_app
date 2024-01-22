// navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/register/Register';
import Login from '../screens/login/Login';
import Welcome from '../screens/welcome/Welcome';
import Verification from '../screens/verification/Verification';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
