// import React from 'react';
// import { StyleSheet, Text, View, Platform, Image } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Ionicons';

// interface CardProps {
//   name?: string;
//   specialty?: string;
//   rating?: number;
//   imageUrl?: string;
//   phone?: string;
//   icon?: string;
//   iconColor?: any;
//   navigation?: any;
//   screen?: string;
//   doctorId?: any;
//   date?: any;
//   time?: any;
//   status?: any;
// }

// const DoctorAppointCard: React.FC<CardProps> = ({
//   imageUrl,
//   name,
//   rating,
//   specialty,
//   phone,
//   icon,
//   iconColor,
//   navigation,
//   screen,
//   doctorId,
//   date,
//   time,
//   status,
// }) => {
//   return (
//     <TouchableOpacity onPress={() => navigation.navigate(screen, { doctorId })}>
//       <View style={styles.container}>
//         {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
//         <View style={styles.textContainer}>
//           <Text style={styles.nameText}>dr. {name}</Text>
//           <Text style={styles.phoneText}>{phone}</Text>

//           <View style={styles.ratingContainer}>
//             <Text style={styles.ratingText}>{rating}</Text>
//             <Text style={styles.ratingText}>{specialty}</Text>
//           </View>

//           <View style={{ flexDirection: 'row' }}>
//             <View>
//               <Text>Date: {date}</Text>
//               <Text>Time: {time}</Text>
//               <View style={styles.statusContainer}>
//                 <Icon
//                   name={icon || ''}
//                   style={[styles.starIcon, { color: iconColor }]}
//                 />
//                 <Text>{status}</Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={() => navigation.navigate(screen, { doctorId })}
//               style={styles.cancelButton}
//             >
//               <Text style={{ color: 'white', textAlign: 'center' }}>
//                 Cancel Appointment
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default DoctorAppointCard;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 16,
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
//   cancelButton: {
//     backgroundColor: '#DE1621',
//     padding: 8,
//     borderRadius: 8,
//     marginTop: 16,
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
//   ratingText: {
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
//   phoneText: {
//     color: '054A80',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
// });

import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface CardProps {
  name?: string;
  specialty?: string;
  rating?: number;
  imageUrl?: string;
  phone?: string;
  icon?: string;
  iconColor?: any;
  navigation?: any;
  screen?: string;
  doctorId?: any;
  date?: any;
  time?: any;
  status?: any;
}

const DoctorAppointCard: React.FC<CardProps> = ({
  imageUrl,
  name,
  rating,
  specialty,
  icon,
  iconColor,
  navigation,
  screen,
  doctorId,
  date,
  time,
  status,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen, { doctorId })}>
      <View style={styles.main}>
        <View style={styles.container}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>dr. {name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{rating} Review</Text>
              <Text style={styles.ratingText}>{specialty} Category</Text>
            </View>
          </View>
        </View>
        {/* asd */}
        <View style={styles.dateContainer}>
          <View style={styles.dateStatusTexts}>
            <Text>
              Date: <Text style={styles.dateText}>{date}</Text>{' '}
            </Text>
            <Text>
              Time: <Text style={styles.dateText}>{time}</Text>{' '}
            </Text>
            <View style={styles.statusContainer}>
              <Icon
                name={icon || ''}
                style={[styles.starIcon, { color: iconColor }]}
              />
              <Text style={styles.textBold}>{status}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(screen, { doctorId })}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
            <Text style={styles.cancelButtonText}>Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorAppointCard;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    paddingRight: 5,
    gap: 8,
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 14,
  },
  dateStatusTexts: {
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#DE1621',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
  },
  textContainer: {
    gap: 4,
    alignItems: 'flex-start',
    marginTop: -8,
    color: '#404446',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#404446',
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
  phoneText: {
    color: '054A80',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    maxWidth: 150,
    overflow: 'hidden',
    fontSize: 14,
    color: '#404446',
  },
  timeText: {
    maxWidth: 150,
    overflow: 'hidden',
    fontSize: 14,
    color: '#404446',
  },
  textBold: {
    fontWeight: 'bold',
  },
});
