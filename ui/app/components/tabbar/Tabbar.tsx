import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../screens/user-profile/UserProfile';
import Home from '../../screens/home/Home';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

const TabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <Icon name='notifications' color={'red'} size={25} />
              <Icon name='chatbox' color={'#064C7E'} size={25} />
            </View>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
  },
});
