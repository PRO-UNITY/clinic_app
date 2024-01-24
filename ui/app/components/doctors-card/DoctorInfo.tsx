import { Image, StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import { Doctor } from '../../types/Doctor';
import Icon from 'react-native-vector-icons/Ionicons';

const DoctorInfo: React.FC<Doctor> = ({
  avatar,
  first_name,
  about,
  review,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.image} />
      <Text style={styles.name}>{first_name}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.infoContainerText}>Patients</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardText}>+100</Text>
            </View>
          </View>
          <View>
            <Text style={styles.infoContainerText}>Experiences</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardText}>+10 year</Text>
            </View>
          </View>
          <View>
            <Text style={styles.infoContainerText}>Rating</Text>
            <View style={styles.infoCard}>
              <Icon name='star' size={16} color='red' />
              <Text style={styles.infoCardText}>{review}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.aboutTitle}>About Doctor</Text>
          <Text style={styles.about}>{about}</Text>
        </View>
      </View>
    </View>
  );
};

export default DoctorInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    marginVertical: 12,
    backgroundColor: '#ffffff4e',
    padding: 4,
    paddingBottom: 20,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  infoContainerText: {
    fontSize: 16,
    color: '#979C9E',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#054A80',
  },
  infoCard: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    marginTop: 10,
    borderRadius: 10,
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
  infoCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054A80',
  },
  aboutTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  about: {
    fontSize: 16,
    color: '#979C9E',
    marginTop: 10,
  },
});
