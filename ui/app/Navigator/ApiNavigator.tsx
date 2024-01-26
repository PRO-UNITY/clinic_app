// navigation.tsx
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/register/Register';
import Login from '../screens/login/Login';
import Welcome from '../screens/welcome/Welcome';
import Verification from '../screens/verification/Verification';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import TabBar from '../components/tabbar/Tabbar';
import Appointment from '../screens/appointment/Appointment';
import AppointDoctor from '../screens/appointment/AppointDoctor';
import DoctorsOneCategory from '../screens/doctors/DoctorsOneCategory';
import UserProfileEdit from '../screens/user-profile/UserProfileEdit';
import Chat from '../screens/chat/Chat';
import ChatList from '../screens/chat/ChatList';
import SavedDoctors from '../screens/doctors/SavedDoctors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='DoctorsOneCategory' component={DoctorsOneCategory} />
      <Stack.Screen name='Appointment' component={Appointment} />
      <Stack.Screen name='AppointDoctor' component={AppointDoctor} />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen name='UserEdit' component={UserProfileEdit} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='ChatList' component={ChatList} />
      <Stack.Screen name='SavedDoctors' component={SavedDoctors} />
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='TabBar'
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
        }}
      />
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
