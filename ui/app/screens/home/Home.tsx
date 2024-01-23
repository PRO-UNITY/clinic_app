import { StyleSheet, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import DoctorsCard from '../../components/doctors-card/DoctorsCard';
import { getDoctors } from '../../services/doctor/doctor';
import { Doctor } from '../../types/Doctor';

const Home = ({ navigation }: any) => {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);

  // get doctors
  useEffect(() => {
    getDoctors().then((res) => setDoctors(res.results));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Banner
        bgColor='#cbe8fe'
        titleColor='#054A80'
        titles={[
          'Consult with specialists,Prevent you from diseases!',
          'Get special 10% discount this December',
        ]}
        imageUrl='https://atlas-content-cdn.pixelsquid.com/stock-images/hospital-3yL2QM6-600.jpg'
      />
      <Text style={styles.title}>Doctors</Text>
      {doctors?.map((doctor: any) => (
        <DoctorsCard
          key={doctor.id} //
          name={doctor.email}
          rating={doctor.reviews}
          specialty={doctor.categories ? doctor.categories : 'Urolog'}
          imageUrl={doctor.avatar}
          icon='star'
          iconColor='#FFC700'
          phone={doctor.phone}
          navigation={navigation}
          screen={`AppointDoctor`}
          doctorId={doctor.id}
        />
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
});
