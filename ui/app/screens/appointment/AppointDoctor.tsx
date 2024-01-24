import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDoctorById, makeAppointment } from '../../services/doctor/doctor';
import DoctorInfo from '../../components/doctors-card/DoctorInfo';

const AppointDoctor = ({ navigation, route }: any) => {
  const { doctorId } = route.params;
  const [doctor, setDoctor] = useState<any>({});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    getDoctorById(doctorId).then((res) => {
      console.log(res);
      setDoctor(res);
    });
  }, []);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
    setShowDatePicker(false);
  };

  const handleNextButton = () => {
    // Format selected date
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    console.log('Selected Date:', formattedDate);

    // Format selected time
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    console.log('Selected Time:', formattedTime);

    const data = {
      content,
      date: formattedDate,
      time: formattedTime,
      doctor: doctorId,
    };
    makeAppointment(data)
      .then((res) => {
        console.log(res);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <DoctorInfo
          first_name={doctor?.first_name}
          review={doctor?.reviews}
          about={
            doctor?.about
              ? doctor?.about
              : ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, laborum sunt libero minus animi repudiandae nam illum soluta architecto similique eveniet id, eos, quaerat necessitatibus itaque reiciendis. Dolorum, totam reiciendis?'
          }
          avatar={
            doctor?.avatar
              ? doctor?.avatar
              : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
          }
        />
        <Text style={styles.title}>Appoint doctor</Text>
        <View style={styles.content}>
          <Text>Current doctor name and phone number or email</Text>
          <View style={styles.appointmentDate}>
            <View>
              <View style={styles.appointmentText}>
                <Icon style={styles.icon} name='calendar-outline' />
                <Text style={styles.text}>Appointment Date</Text>
              </View>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  onPress={showDatePickerModal}
                  style={[styles.customButton, { width: '100%' }]}
                >
                  <Text style={styles.buttonText}>Choose date</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    testID='datePicker'
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display='default'
                    onChange={onChangeDate}
                    style={styles.picker}
                  />
                )}
              </View>
            </View>

            <View>
              <View style={styles.appointmentText}>
                <Icon style={styles.icon} name='time-outline' />
                <Text style={styles.text}>Appointment Time</Text>
              </View>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  onPress={showTimePickerModal}
                  style={[styles.customButton, { width: '100%' }]}
                >
                  <Text style={styles.buttonText}>Choose time</Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    testID='timePicker'
                    value={time}
                    mode='time'
                    is24Hour={true}
                    display='default'
                    onChange={onChangeTime}
                    style={styles.picker}
                  />
                )}
              </View>
            </View>
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={(text) => setContent(text)}
              placeholder='Content'
              // keyboardType='phone-pad'
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleNextButton} style={styles.customButton}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#054A80',
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    color: '#404446',
  },
  appointmentDate: {
    flex: 1,
    gap: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  appointmentText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404446',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#404446',
  },
  pickerContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: '#054A80',
    padding: 10,
    borderRadius: 5,
    marginBottom: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    marginTop: 10,
    margin: 0,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default AppointDoctor;
