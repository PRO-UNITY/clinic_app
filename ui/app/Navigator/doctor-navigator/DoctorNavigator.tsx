// navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../../screens/register/Register';
import Login from '../../screens/login/Login';
import ForgotPassword from '../../screens/forgot-password/ForgotPassword';
import Verification from '../../screens/verification/Verification';
import UserProfileEdit from '../../screens/user-profile/UserProfileEdit';
import Chat from '../../screens/chat/Chat';
import ChatList from '../../screens/chat/ChatList';
import Welcome from '../../screens/welcome/Welcome';
import DoctorHome from '../../screens/doctor-screen/doctor-home/DoctorHome';
import DoctorTabBar from '../../components/doctor-tabbar/DoctorTabBar';
import DoctorAppointmentUser from '../../screens/doctor-screen/doctor-appointment-user/DoctorAppointmentUser';
import DoctorCalendarAppointments from '../../screens/doctor-screen/doctor-calendar-appointments/DoctorCalendarAppointments';

const Stack = createStackNavigator();

const DoctorNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen name='UserEdit' component={UserProfileEdit} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='ChatList' component={ChatList} />
      <Stack.Screen name='DoctorHome' component={DoctorHome} />
      <Stack.Screen
        name='DoctorCalendarAppointments'
        component={DoctorCalendarAppointments}
      />
      <Stack.Screen
        name='DoctorAppointmentUser'
        component={DoctorAppointmentUser}
      />
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DoctorTabBar'
        component={DoctorTabBar}
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

export default DoctorNavigator;
