import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';

import {
  getPatients,
  getPatientsByDate,
} from '../../../services/patient/patient';
import { Patient } from '../../../types/Patient/Patient';
import PatientsCard from '../../../components/patients-card/PatientsCard';
import {
  blueColor,
  greenColor,
  mainColor,
  redColor,
  yellowColor,
} from '../../../utils/colors';
import { formatBusyDaysToMarkedDates } from '../../../utils/dates';

const DoctorHome = ({ navigation }: any) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [markedDates, setMarkedDates] = useState<any>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getPatients().then((res) => {
      setPatients(res.data.results);
      if (res.busy_days && res.busy_days.length > 0) {
        const markedDatesData = formatBusyDaysToMarkedDates(res.busy_days);
        setMarkedDates(markedDatesData);
      }
    });
  }, [date, isFocused]);

  const showCalendarHandler = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDayPress = (day: any) => {
    setShowCalendar(false);
    setFiltered(true);
    getPatientsByDate(day.dateString).then((res: any) => {
      console.log(res);

      setPatients(res.data.results);
    });
  };

  const clearFilter = () => {
    setFiltered(false);
    getPatients().then((res) => {
      setPatients(res.data.results);
    });
  };

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <PatientsCard
      first_name={item.user.first_name ? item.user.first_name : 'No name'}
      key={item.id}
      id={item.id}
      content={item.content}
      imageUrl={
        'https://cdn.vectorstock.com/i/preview-1x/29/89/unknown-person-silhouette-whit-tie-vector-3212989.jpg'
      }
      // imageUrl={
      //   item.user.avatar
      //     ? item.user.avatar
      //     : 'https://cdn.vectorstock.com/i/preview-1x/29/89/unknown-person-silhouette-whit-tie-vector-3212989.jpg'
      // }
      icon='ellipse'
      iconColor={
        item.status === 'ONGOING'
          ? blueColor
          : item.status === 'CANCELED'
          ? yellowColor
          : item.status === 'COMPLETED'
          ? greenColor
          : item.status === 'IN_QUEUE'
          ? yellowColor
          : item.status === 'IN_PROGRESS'
          ? blueColor
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
            <Text style={styles.showCalendarButtonText}>Search by date</Text>
          )}
        </Pressable>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              markedDates={markedDates}
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
