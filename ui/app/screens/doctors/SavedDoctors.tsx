import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  getSavedDoctors,
  deleteSavedDoctor,
} from '../../services/doctor/doctor';
import DoctorsCard from '../../components/doctors-card/DoctorsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const SavedDoctors = () => {
  const [doctors, setDoctors] = React.useState<any>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  useEffect(() => {
    getSavedDoctors().then((res: any) => {
      setDoctors(res.results);
    });
  }, [isRefreshing]);

  const handleDeleteSaved = (id: any) => {
    deleteSavedDoctor(id).then((res: any) => {
      setIsRefreshing(!isRefreshing);
    });
  };

  return (
    <View style={styles.container}>
      {doctors?.length === 0 && (
        <Text style={{ textAlign: 'center' }}>You have no saved doctors</Text>
      )}
      {doctors?.map((doctor: any) => (
        <View style={styles.doctorsContainer}>
          <View style={styles.doctorCard}>
            <DoctorsCard
              key={doctor.id}
              name={doctor?.doctor.first_name}
              phone={doctor?.doctor?.last_name}
              rating={doctor?.doctor?.reviews}
              icon='star'
              iconColor='#FFC700'
              imageUrl={
                doctor?.doctor?.avatar
                  ? doctor?.doctor?.avatar
                  : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
              }
              specialty={
                doctor?.doctor?.categories__name
                  ? doctor?.doctor?.categories__name
                  : 'Urolog'
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => handleDeleteSaved(doctor?.id)}
            style={styles.deleteButton}
          >
            <Icon name='trash-outline' size={30} color='red' />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SavedDoctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  doctorsContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorCard: {
    flex: 2,
  },
  deleteButton: {
    marginTop: 5,
  },
});
