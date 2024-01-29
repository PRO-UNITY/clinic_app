// navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserNavigator from './user-navigator/UserNavigator';
import DoctorNavigator from './doctor-navigator/DoctorNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    // <UserNavigator />
    <DoctorNavigator />
  );
};

export default AppNavigator;
