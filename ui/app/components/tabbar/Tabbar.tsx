import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../screens/user-profile/UserProfile';
import Home from '../../screens/home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import HeaderTitle from '../header/HeaderTitle';
import Appointment from '../../screens/appointment/Appointment';
import Categories from '../../screens/categories/Categories';
import { getNotifications } from '../../services/notification/notification';
import { redColor } from '../../utils/colors';
const Tab = createBottomTabNavigator();
import { useIsFocused } from '@react-navigation/native';

const TabBar = ({ navigation }: any) => {
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const isFocused = useIsFocused();

  const headersTitleIcons = [
    { name: 'chatbox-outline', color: '#000', size: 25, screen: 'ChatList' },
    {
      name:
        notifications.length > 0 ? 'notifications' : 'notifications-outline',
      color: notifications.length > 0 ? redColor : '#000',
      size: 25,
      screen: 'Notification',
    },
    {
      name: 'bookmark-outline',
      color: '#000',
      size: 25,
      screen: 'SavedDoctors',
    },
  ];

  useEffect(() => {
    getNotifications(1).then((res) => {
      console.log(res);
      setNotifications(res.results);
    });
  }, [isFocused]);

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
        name='Home'
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Icon name='apps' color={color} size={size} />
          ),
        }}
        name='Categories'
        component={Categories}
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
