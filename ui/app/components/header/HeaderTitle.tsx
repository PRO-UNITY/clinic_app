// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// const HeaderTitle = ({ icons, navigation }: any) => {
//   return (
//     <View style={styles.header}>
//       <Text style={styles.titleText}>Clinic App</Text>
//       <View style={styles.iconsContainer}>
//         {icons.map((icon: any, index: any) => (
//           <TouchableOpacity onPress={() => navigation.navigate(icon.screen)}>
//             <Icon
//               key={index}
//               name={icon.name}
//               color={icon.color}
//               size={icon.size}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default HeaderTitle;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     gap: 8,
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#054A80',
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: 60,
//   },
// });

import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderTitle = ({ icons, navigation }: any) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // Implement any logic if needed
      }}
    >
      <View style={styles.header}>
        <Text style={styles.titleText}>Clinic App</Text>
        <View style={styles.iconsContainer}>
          {icons.map((icon: any, index: any) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate(icon.screen)}
            >
              <View style={styles.iconContainer}>
                <Icon name={icon.name} color={icon.color} size={icon.size} />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#054A80',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 8, // Adjust as needed
  },
});
