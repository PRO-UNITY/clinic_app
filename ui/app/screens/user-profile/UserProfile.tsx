import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { getUserProfile } from '../../services/user/user';
import { mainColor } from '../../utils/colors';
import ProfileListItem from '../../components/profile-list-item/ProfileListItem';
import { BASE_URL } from '../../utils';

const Profile = ({ navigation, route }: any) => {
  const [user, setUser] = React.useState<any>({});

  useEffect(() => {
    const updatedUser = route.params?.updatedUser;
    if (updatedUser) {
      setUser(updatedUser);
      console.log(updatedUser);
    } else {
      getUserProfile().then((res: any) => {
        setUser(res);
      });
    }
  }, [route.params?.updatedUser]);

  const data = [
    {
      label: 'First name',
      value: user?.first_name ? user.first_name : 'JohnDoe',
    },
    {
      label: 'Last name',
      value: user?.last_name ? user.last_name : 'No last name',
    },
    {
      label: 'Date of birth',
      value: user?.date_of_birth ? user.date_of_birth : 'No date_of_birth',
    },
    {
      label: 'Email',
      value: user?.email ? user.email : 'john.doe@example.com',
    },
    { label: 'Phone', value: user?.phone ? user.phone : '998901234567' },
    {
      label: 'Gender',
      value:
        user?.gender === 1
          ? 'Male'
          : user?.gender === 2
          ? 'Female'
          : 'No selected Gender',
    },
    {
      label: 'Address',
      value: user?.address ? user.address : 'No address',
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user.avatar
            ? user.avatar.startsWith('/media/avatar/')
              ? BASE_URL + user.avatar
              : user.avatar
            : 'https://img.freepik.com/free-photo/close-up-confident-male-employee-white-collar-shirt-smiling-camera-standing-self-assured-against-studio-background_1258-26761.jpg',
        }}
        style={styles.avatar}
      />
      <Text style={styles.titleHead}>{user.role}</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProfileListItem label={item.label} value={item.value} />
        )}
        keyExtractor={(item) => item.label}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('UserEdit', { user })}
        style={styles.editButton}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  titleHead: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: mainColor,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: mainColor,
    borderWidth: 1,
    borderColor: mainColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;
