import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getPatientById } from '../../../services/patient/patient';
import PatientsCardInfo from '../../../components/patients-card/PatientCardInfo';
import { greenColor, redColor, yellowColor } from '../../../utils/colors';
import { cancelAppointment } from '../../../services/doctor/doctor';

const DoctorAppointmentUser = ({ navigation, route }: any) => {
  const { patientId } = route.params;
  const [appointmentData, setAppointmentData] = React.useState<any>(null);

  useEffect(() => {
    getPatientById(patientId).then((res: any) => {
      console.log(res);
      setAppointmentData(res);
    });
  }, [patientId]);

  const handleCancelAppointment = () => {
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
              navigation.navigate('AppointDoctor', {
                doctorId,
                updateSchedule,
              }),
          },
        ]
      );
    };
  };

  return (
    <View style={styles.container}>
      <Text>DoctorAppointmentUser</Text>
      {appointmentData ? (
        // @ts-ignore
        <PatientsCardInfo
          key={appointmentData.id}
          first_name={appointmentData.user.first_name}
          content={appointmentData.content}
          date={appointmentData.timestamp}
          time={appointmentData.timestamp}
          imageUrl={appointmentData.user.avatar}
          icon='ellipse'
          iconColor={yellowColor}
          gender={appointmentData.user.gender === 1 ? 'Male' : 'Female'}
          status={appointmentData.status}
          screen='AppointmentDetails'
          navigation={'navigation'}
          patientId={appointmentData.id}
          buttons={[
            {
              label: 'Accept',
              onPress: () => navigation.navigate('Chat', { patientId }),
              color: greenColor,
            },
            {
              label: 'Cancel',
              onPress: () => handleCancelAppointment,
              color: redColor,
            },
          ]}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default DoctorAppointmentUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
