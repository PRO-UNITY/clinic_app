// TabBar.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/Home';
import UserProfile from '../../screens/user-profile/UserProfile';
import Home from '../../screens/home/Home';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
        name='Home'
        component={Home}
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
