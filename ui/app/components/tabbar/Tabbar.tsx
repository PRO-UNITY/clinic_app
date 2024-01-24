import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../screens/user-profile/UserProfile';
import Home from '../../screens/home/Home';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import HeaderTitle from '../header/HeaderTitle';
import Appointment from '../../screens/appointment/Appointment';

const TabBar = ({ navigation }: any) => {
  const headersTitleIcons = [
    { name: 'chatbox-outline', color: '#000', size: 25, screen: 'TabBar' },
    {
      name: 'notifications-outline',
      color: '#000',
      size: 25,
      screen: 'Appointment',
    },
  ];

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          headerTitle: () => (
            <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
          ),
        }}
        name='Home'
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color, size }) => (
            <Icon name='calendar' color={color} size={size} />
          ),
        }}
        name='Appointment'
        component={Appointment}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
        name='User'
        component={UserProfile}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
  },
});
