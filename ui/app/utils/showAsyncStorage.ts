import AsyncStorage from '@react-native-async-storage/async-storage';

export const showAsyncStorage = async () => {
  AsyncStorage.getAllKeys()
    .then((keys) => {
      console.log('Keys in AsyncStorage:', keys);
      return AsyncStorage.multiGet(keys);
    })
    .then((data) => {
      console.log('Data in AsyncStorage:', data);
    })
    .catch((error) => {
      console.error('Error reading AsyncStorage:', error);
    });
};
