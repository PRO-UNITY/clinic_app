import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { mainColor } from '../../../utils/colors';
import { formatBusyDaysToMarkedDates } from '../../../utils/dates';
import { getPatients } from '../../../services/patient/patient';
import { useIsFocused } from '@react-navigation/native';

const DoctorCalendarAppointments = () => {
  const [markedDates, setMarkedDates] = React.useState<any>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getPatients().then((res: any) => {
      if (res.busy_days && res.busy_days.length > 0) {
        const markedDatesData = formatBusyDaysToMarkedDates(res.busy_days);
        setMarkedDates(markedDatesData);
      }
    });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Work Calendar</Text>
      <Calendar
        markedDates={markedDates}
        disableAllTouchEventsForDisabledDays={true}
      />
    </View>
  );
};

export default DoctorCalendarAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: mainColor,
  },
});
