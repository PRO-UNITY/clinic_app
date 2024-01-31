import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { mainColor } from '../../../utils/colors';

const customMarkedDates = {
  '2024-01-10': {
    selected: true,
    selectedColor: 'red',
    selectedTextColor: 'white',
  },
  '2024-01-26': {
    selected: true,
    selectedColor: 'red',
    selectedTextColor: 'white',
  },
  '2024-01-28': {
    selected: true,
    selectedColor: 'red',
    selectedTextColor: 'white',
  },
};

const DoctorCalendarAppointments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Work Calendar</Text>
      <Calendar
        markedDates={customMarkedDates}
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
