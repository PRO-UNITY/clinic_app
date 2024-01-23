import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

const HeaderTitle = ({ icons, navigation }: any) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.titleText}>Clinic App</Text>
      <View style={styles.iconsContainer}>
        {icons.map((icon: any, index: any) => (
          <TouchableOpacity onPress={() => navigation.navigate(icon.screen)}>
            <Icon
              key={index}
              name={icon.name}
              color={icon.color}
              size={icon.size}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#054A80',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
});
