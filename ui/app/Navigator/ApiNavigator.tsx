import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserNavigator from './user-navigator/UserNavigator';
import DoctorNavigator from './doctor-navigator/DoctorNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        setRole(storedRole || '');
      } catch (error) {
        console.error('Error fetching role from AsyncStorage:', error);
      }
    };

    fetchRole();
  }, []);

  return <>{role === 'patient' ? <UserNavigator /> : <DoctorNavigator />}</>;
};

export default AppNavigator;
