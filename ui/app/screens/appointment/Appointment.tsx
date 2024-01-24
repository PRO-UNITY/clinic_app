import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import { ScrollView } from 'react-native-gesture-handler';
import DoctorsCard from '../../components/doctors-card/DoctorsCard';
import { getAppointmentDoctors } from '../../services/doctor/doctor';

const Appointment = () => {
  const [doctors, setDoctors] = React.useState<any>([]);

  // get appointment doctors
  useEffect(() => {
    getAppointmentDoctors().then((res: any) => setDoctors(res.results));
  }, []);

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
        <DoctorsCard
          key={doctor.id}
          name={doctor.email ? doctor.email : 'No email'}
          rating={doctor.reviews ? doctor.reviews : 1.1}
          specialty={doctor.categories ? doctor.categories : 'No categories'}
          imageUrl={
            doctor.avatar
              ? doctor.avatar
              : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
          }
          icon='ellipse'
          iconColor={
            doctor.status === 'IN_PROGRESS'
              ? '#FFC700'
              : doctor.status === 'IN_QUEUE'
              ? '#00a8ff'
              : doctor.status === 'CANCELLED'
              ? '#e84118'
              : doctor.status === 'ONGOING'
              ? '#4cd137'
              : '#718093'
          }
          phone={doctor.phone ? doctor.phone : '998911234567'}
          // navigation={navigation}
          // screen={`AppointDoctor`}
          doctorId={doctor.id}
        />
      ))}
    </ScrollView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
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
