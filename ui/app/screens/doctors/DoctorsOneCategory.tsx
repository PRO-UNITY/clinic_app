import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import { getDoctorsByCategory } from '../../services/doctor/doctor';
import DoctorsCard from '../../components/doctors-card/DoctorsCard';

const DoctorsOneCategory = ({ navigation, route }: any) => {
  const [doctors, setDoctors] = React.useState<any>([]);
  const { categoryId } = route.params;

  useEffect(() => {
    getDoctorsByCategory(categoryId).then((res: any) => {
      console.log(res);
      setDoctors(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Banner
        bgColor='#30336b'
        titleColor='#fff'
        titles={[
          'Consult with specialists,Prevent you from diseases!',
          'Get special 10% discount this December',
        ]}
        imageUrl='https://atlas-content-cdn.pixelsquid.com/stock-images/hospital-3yL2QM6-600.jpg'
      />
      {doctors?.doctors_set?.map((doctor: any) => (
        <DoctorsCard
          key={doctor.id}
          name={doctor.first_name}
          rating={doctor.rating ? doctor.rating : 0}
          specialty={doctors?.name ? doctors.name : 'Urolog'}
          imageUrl={
            doctor.avatar
              ? doctor.avatar
              : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
          }
          icon='star'
          iconColor='#FFC700'
          phone={doctor.phone}
          navigation={navigation}
          screen={`AppointDoctor`}
          doctorId={doctor.id}
        />
      ))}
    </View>
  );
};

export default DoctorsOneCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
