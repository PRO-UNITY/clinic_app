import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../screens/user-profile/UserProfile';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import HeaderTitle from '../header/HeaderTitle';

import DoctorHome from '../../screens/doctor-screen/doctor-home/DoctorHome';
import DoctorCalendarAppointments from '../../screens/doctor-screen/doctor-calendar-appointments/DoctorCalendarAppointments';
const Tab = createBottomTabNavigator();

const DoctorTabBar = ({ navigation }: any) => {
  const headersTitleIcons = [
    { name: 'chatbox-outline', color: '#000', size: 25, screen: 'ChatList' },
    {
      name: 'notifications-outline',
      color: '#000',
      size: 25,
      screen: 'Appointment',
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {};
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
            </View>
          ),
        }}
        name='DoctorHome'
        component={DoctorHome}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Icon name='calendar' color={color} size={size} />
          ),
        }}
        name='Calendar'
        component={DoctorCalendarAppointments}
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

export default DoctorTabBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
  },
});
