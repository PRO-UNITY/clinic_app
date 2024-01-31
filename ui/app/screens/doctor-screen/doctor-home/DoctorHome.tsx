import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

import {
  getPatients,
  getPatientsByDate,
} from '../../../services/patient/patient';
import { Patient } from '../../../types/Patient/Patient';
import PatientsCard from '../../../components/patients-card/PatientsCard';
import {
  greenColor,
  mainColor,
  redColor,
  yellowColor,
} from '../../../utils/colors';

const customMarkedDates = {
  '2024-01-01': {
    selected: true,
    selectedColor: greenColor,
    selectedTextColor: 'white',
  },
  '2024-01-27': {
    selected: true,
    selectedColor: greenColor,
    selectedTextColor: 'white',
  },
};

const DoctorHome = ({ navigation }: any) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getPatients().then((res) => {
      setPatients(res.results);
    });
  }, [date]);

  const showCalendarHandler = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDayPress = (day: any) => {
    setShowCalendar(false);
    setFiltered(true);
    getPatientsByDate(day.dateString).then((res: any) => {
      setPatients(res.results);
    });
  };

  const clearFilter = () => {
    setFiltered(false);

    getPatients().then((res) => {
      setPatients(res.results);
    });
  };

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <PatientsCard
      first_name={item.user.first_name ? item.user.first_name : 'No name'}
      key={item.id}
      id={item.id}
      content={item.content}
      gender={item.user.gender}
      imageUrl={item.user.avatar}
      icon='ellipse'
      iconColor={
        item.status === 'ONGOING'
          ? greenColor
          : item.status === 'CANCELED'
          ? yellowColor
          : redColor
      }
      status={item.status}
      navigation={navigation}
      screen={`DoctorAppointmentUser`}
      patientId={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleSearchText}>Search appointment with date</Text>
      <View style={styles.pickerContainer}>
        <Pressable
          onPress={showCalendarHandler}
          style={styles.showCalendarButton}
        >
          {showCalendar ? (
            <Text style={styles.showCalendarButtonText}>Hide Calendar</Text>
          ) : (
            <Text style={styles.showCalendarButtonText}>Show Calendar</Text>
          )}
        </Pressable>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              markedDates={customMarkedDates}
              onDayPress={handleDayPress}
              theme={{
                arrowColor: mainColor,
              }}
            />
          </View>
        )}
        {filtered && (
          <Pressable onPress={clearFilter} style={styles.showCalendarButton}>
            <Text style={styles.showCalendarButtonText}>Clear Filter</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.titleSearchText}>Your Appointments</Text>
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DoctorHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleSearchText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  showCalendarButton: {
    backgroundColor: mainColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  showCalendarButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  calendarContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  calendar: {
    borderRadius: 10,
  },
});
