// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   Image,
//   Pressable,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { PatientsCardProps } from '../../types/Patient/PatientCard';

// const PatientsCardInfo: React.FC<PatientsCardProps> = ({
//   first_name,
//   content,
//   imageUrl,
//   icon,
//   iconColor,
//   gender,
//   status,
//   screen,
//   navigation,
//   patientId,
//   buttons,
// }) => {
//   return (
//     <Pressable onPress={() => navigation.navigate(screen, { patientId })}>
//       <View style={styles.container}>
//         {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
//         <View style={styles.textContainer}>
//           <Text style={styles.nameText}>Name: {first_name}</Text>
//           <Text style={styles.contentText}>{content}</Text>
//           <View style={styles.ratingContainer}>
//             {icon && (
//               <Icon
//                 name={icon}
//                 style={[styles.starIcon, { color: iconColor }]}
//               />
//             )}
//             <Text style={styles.statusText}>{status}</Text>
//             <Text style={styles.genderText}>{gender}</Text>
//           </View>
//           <View style={styles.buttonsContainer}>
//             {buttons
//               ? buttons.map((button, index) => (
//                   <Pressable
//                     key={index}
//                     style={[styles.button, { backgroundColor: button.color }]}
//                     onPress={button.onPress}
//                   >
//                     <Text style={styles.buttonText}>{button.label}</Text>
//                   </Pressable>
//                 ))
//               : null}
//           </View>
//         </View>
//       </View>
//     </Pressable>
//   );
// };

// export default PatientsCardInfo;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 12,
//     backgroundColor: 'white',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 30,
//   },
//   textContainer: {
//     gap: 4,
//     alignItems: 'flex-start',
//     marginTop: -8,
//     color: '#404446',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 8,
//   },
//   statusText: {
//     fontSize: 14,
//     color: '#404446',
//   },
//   genderText: {
//     fontSize: 14,
//     color: '#404446',
//   },
//   nameText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 8,
//     color: '#404446',
//   },
//   starIcon: {
//     fontSize: 16,
//   },
//   contentText: {
//     color: '054A80',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     gap: 4,
//     marginTop: 8,
//     justifyContent: 'space-between',
//   },
//   button: {
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: '#3498db',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//     fontVariant: ['small-caps'],
//   },
// });
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import { PatientsCardProps } from '../../types/Patient/PatientCard';

import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons';
import { grayColor, mainColor } from '../../utils/colors';

const PatientsCardInfo: React.FC<PatientsCardProps> = ({
  first_name,
  content,
  imageUrl,
  icon,
  iconColor,
  gender,
  status,
  screen,
  navigation,
  patientId,
  buttons,
  date,
  time,
}) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.dataContainer}>
            <Text style={styles.nameText}>Name: {first_name}</Text>
            <View style={styles.ratingContainer}>
              {icon && (
                <Icon
                  name={icon}
                  style={[styles.starIcon, { color: iconColor }]}
                />
              )}
              <Text style={styles.textsStyles}>{status}</Text>
              <Text style={styles.textsStyles}>Gender: {gender}</Text>
            </View>
            <Text style={styles.textsStyles}>
              Date: {moment(date, 'YYYY-MM-DD - HH:mm:ss').format('YYYY-MM-DD')}
            </Text>
            <Text style={styles.textsStyles}>
              Time: {moment(time, 'YYYY-MM-DD - HH:mm:ss').format('HH:mm')}
            </Text>
            <Text style={styles.contentText}>Content: {content}</Text>
            <View style={styles.buttonsContainer}>
              {buttons
                ? buttons.map((button, index) => (
                    <Pressable
                      key={index}
                      style={[styles.button, { backgroundColor: button.color }]}
                      onPress={button.onPress}
                    >
                      <Text style={styles.buttonText}>{button.label}</Text>
                    </Pressable>
                  ))
                : null}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  dataContainer: {
    flex: 1,
    marginLeft: 8,
    gap: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  textsStyles: {
    fontSize: 14,
    fontVariant: ['small-caps'],
    fontWeight: '600',
    color: mainColor,
  },

  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#404446',
  },
  starIcon: {
    fontSize: 16,
  },
  contentText: {
    color: '#054A80',
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontVariant: ['small-caps'],
  },
});

export default PatientsCardInfo;
