import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getPatientById } from '../../../services/patient/patient';
import PatientsCardInfo from '../../../components/patients-card/PatientCardInfo';
import {
  blueColor,
  greenColor,
  redColor,
  yellowColor,
} from '../../../utils/colors';
import { statusAppointment } from '../../../services/doctor/doctor';

const DoctorAppointmentUser = ({ navigation, route }: any) => {
  const { patientId } = route.params;
  const [appointmentData, setAppointmentData] = React.useState<any>(null);

  useEffect(() => {
    getPatientById(patientId).then((res: any) => {
      setAppointmentData(res);
    });
  }, [patientId]);

  const handleStatusAppointment = ({
    patientId,
    statusId,
    alertMessage,
  }: {
    patientId: number;
    statusId: number;
    alertMessage: string;
  }) => {
    Alert.alert(
      `Are you sure you want to ${alertMessage}?`,
      `${alertMessage} Confirmation`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            statusAppointment(patientId, statusId).then((res) => {
              if (statusId === 1) {
                Alert.alert(
                  'Appointment Canceled',
                  'The appointment has been canceled.'
                );
              } else {
                Alert.alert(
                  'Appointment Accepted',
                  'The appointment has been accepted.'
                );
              }
              navigation.goBack();
            }),
        },
      ]
    );
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
          iconColor={
            appointmentData.status === 'ONGOING'
              ? greenColor
              : appointmentData.status === 'CANCELED'
              ? redColor
              : yellowColor
          }
          gender={appointmentData.user.gender === 1 ? 'Male' : 'Female'}
          status={appointmentData.status}
          screen='AppointmentDetails'
          navigation={'navigation'}
          patientId={appointmentData.id}
          buttons={[
            {
              label: 'Accept',
              onPress: () =>
                handleStatusAppointment({
                  patientId: patientId,
                  statusId: 2,
                  alertMessage: 'accept the appointment',
                }),
              color: greenColor,
            },
            {
              label: 'Cancel',
              onPress: () =>
                handleStatusAppointment({
                  patientId: patientId,
                  statusId: 1,
                  alertMessage: 'cancel the appointment',
                }),
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
