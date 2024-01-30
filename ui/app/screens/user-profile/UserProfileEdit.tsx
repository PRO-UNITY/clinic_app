import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getUserProfile,
  updateUserProfile,
  getGender,
} from '../../services/user/user';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { mainColor } from '../../utils/colors';

const UserProfileEdit = ({ route, navigation }: any) => {
  const [user, setUser] = React.useState<any>({});
  const { id } = route.params.user;

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.date_of_birth || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [address, setAddress] = useState(user?.address || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [genderList, setGenderList] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    console.log(id);
    getUserProfile().then((res: any) => {
      // setUser(res);
      setFirstName(res.first_name);
      setLastName(res.last_name);
      setDateOfBirth(res.date_of_birth);
      setPhone(res.phone);
      setSelectedGender(res.gender);
      setGender(res.gender === 1 ? 'Male' : 'Female');
      setAddress(res.address);
      setAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    getGender().then((res: any) => {
      setGenderList(res);
    });
  }, []);

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // @ts-ignore
    if (!result.cancelled) {
      // @ts-ignore
      setAvatar(result.assets[0].uri);
    } else {
      console.log('cancelled');
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('date_of_birth', '1999-01-01');
      formData.append('phone', phone);
      formData.append('gender', selectedGender);
      formData.append('address', address);

      if (avatar) {
        const avatarFile = {
          uri: avatar,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        };
        // @ts-ignore
        formData.append('avatar', avatarFile);
      }
      const updatedUser = await updateUserProfile(id, formData);
      navigation.navigate('User', { updatedUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>First name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text>Last name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text>Date of birth:</Text>
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder='YYYY-MM-DD'
        keyboardType='numeric'
      />
      <Text>Phone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <Text>Gender:</Text>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <View style={[styles.input, styles.genderInput]}>
          <Text style={styles.genderText}>{gender || 'Select Gender'}</Text>
        </View>
      </TouchableOpacity>

      {isPickerVisible && (
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => {
            setSelectedGender(itemValue);
            setGender(itemValue === '1' ? 'Male' : 'Female');
            setPickerVisible(false);
          }}
        >
          <Picker.Item label={'Select Gender'} value={''} />
          {genderList.map((item: any) => (
            <Picker.Item label={item.name} value={item.id} />
          ))}
        </Picker>
      )}
      <Button title='Choose Image' onPress={handleChooseImage} />
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <Button title='Save Changes' onPress={handleSave} />
    </View>
  );
};

export default UserProfileEdit;

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  genderInput: {
    backgroundColor: mainColor,
    color: 'white',
    justifyContent: 'center',
    borderColor: mainColor,
  },
  genderText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
