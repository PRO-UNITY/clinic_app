import { Alert, StyleSheet, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Banner from '../../components/banner/Banner';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getAppointmentDoctors,
  cancelAppointment,
} from '../../services/doctor/doctor';
import DoctorAppointCard from '../../components/doctors-card/DoctorAppointCard';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  blueColor,
  grayColor,
  greenColor,
  redColor,
  yellowColor,
} from '../../utils/colors';

const Appointment = ({ navigation, route }: any) => {
  const [doctors, setDoctors] = React.useState<any>([]);

  const [deletedDoctor, setDeletedDoctor] = React.useState<any>(null);
  const isFocused = useIsFocused();

  // get appointment doctors
  useEffect(() => {
    getAppointmentDoctors().then((res: any) => {
      setDoctors(res.results);
      console.log(res);
    });
  }, [isFocused]);

  const handleCancelConfirmation = (doctorId: any) => {
    Alert.alert(
      'Are you sure you want to cancel the appointment?',
      'Cancel Confirmation',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            cancelAppointment(doctorId)
              .then(() => {
                setDoctors((prevDoctors: any) =>
                  prevDoctors.filter((doctor: any) => doctor.id !== doctorId)
                );
              })
              .catch((err) => console.error('Cancellation error:', err));
          },
        },
      ]
    );
  };

  const handleRescheduleConfirmation = (doctorId: any) => {
    const updateSchedule = true;
    Alert.alert(
      'Are you sure you want to reschedule the appointment?',
      'Reschedule Confirmation',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            navigation.navigate('AppointDoctor', { doctorId, updateSchedule }),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Banner
        bgColor='#FF7360'
        titleColor='#fff'
        titles={['Booking appointment', 'Get special 10% discount']}
        imageUrl='https://img.freepik.com/premium-vector/hospital-building-icon_47016-173.jpg'
      />
      <Text style={styles.title}>Your appointment doctors</Text>
      {doctors?.map((doctor: any) => (
        <DoctorAppointCard
          key={doctor.id}
          name={doctor.doctor.first_name ? doctor.doctor.first_name : 'No name'}
          rating={doctor.reviews ? doctor.reviews : 1.1}
          date={doctor.timestamp ? doctor.timestamp : 'No date'}
          time={doctor.timestamp ? doctor.timestamp : 'No time'}
          status={doctor?.status ? doctor.status : 'No status'}
          navigation={navigation}
          onCancelConfirmation={handleCancelConfirmation}
          phone={doctor.phone ? doctor.phone : '998911234567'}
          doctorId={doctor.id}
          onRescheduleAppointment={() =>
            handleRescheduleConfirmation(doctor.id)
          }
          specialty={
            doctor?.doctor?.categories
              ? doctor?.doctor.categories
              : 'No categories'
          }
          imageUrl={
            doctor.avatar
              ? doctor.avatar
              : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
          }
          icon='ellipse'
          iconColor={
            doctor.status === 'IN_PROGRESS'
              ? grayColor
              : doctor.status === 'CANCELLED'
              ? redColor
              : doctor.status === 'ONGOING'
              ? greenColor
              : doctor.status === 'COMPLETED'
              ? blueColor
              : yellowColor
          }
        />
      ))}
    </ScrollView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 25,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
});
