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
      {/* {doctors?.map((doctor: any) => ( */}

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

      <DoctorsCard
        name={'doctor.email'}
        rating={4.5}
        specialty={'doctor.categories'}
        imageUrl={
          'https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q='
        }
        phone={'doctor.phone'}
        icon='ellipse'
        iconColor='#e84118'
      />
      <DoctorsCard
        name={'doctor.email'}
        rating={4.5}
        specialty={'doctor.categories'}
        imageUrl={
          'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*'
        }
        phone={'doctor.phone'}
        icon='ellipse'
        iconColor='#4cd137'
      />
      <DoctorsCard
        name={'doctor.email'}
        rating={4.5}
        specialty={'doctor.categories'}
        imageUrl={
          'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
        }
        phone={'doctor.phone'}
        icon='ellipse'
        iconColor='#FFC700'
      />
      <DoctorsCard
        name={'doctor.email'}
        rating={4.5}
        specialty={'doctor.categories'}
        imageUrl={
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww'
        }
        phone={'doctor.phone'}
        icon='ellipse'
        iconColor='#FFC700'
      />
      <DoctorsCard
        name={'doctor.email'}
        rating={4.5}
        specialty={'doctor.categories'}
        imageUrl={
          'https://media.istockphoto.com/id/1327024466/photo/portrait-of-male-doctor-in-white-coat-and-stethoscope-standing-in-clinic-hall.jpg?s=612x612&w=0&k=20&c=49wqOwwuonk9f8NACL7M_5RosqQPFwJ8-dpmeo9AvQw='
        }
        phone={'doctor.phone'}
        icon='ellipse'
        iconColor='#FFC700'
      />
      {/* ))} */}
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
