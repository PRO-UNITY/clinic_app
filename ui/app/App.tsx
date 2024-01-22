// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
// import AppNavigator from './Navigator/ApiNavigator';
// import { NavigationContainer } from '@react-navigation/native';
// // import { Tab } from '@mui/icons-material';
// import TabBar from './components/tabbar/Tabbar';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <AppNavigator />
//         <TabBar />
//         <StatusBar style='auto' />
//       </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// App.js
// App.tsx
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './Navigator/ApiNavigator';
// import TabBar from './components/tabbar/Tabbar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
