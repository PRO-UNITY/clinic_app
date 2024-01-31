import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import React from 'react';
import { Category } from '../../types/Category';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CategoriesCard: React.FC<Category> = ({
  logo,
  name,
  screen,
  categoryId,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mdContainer}
        onPress={() => navigation.navigate(screen, { categoryId })}
      >
        <Image source={{ uri: logo }} style={styles.logo} />
        <Text style={styles.textName}>
          {name && name.length >= 11 ? `${name.substring(0, 7)}...` : name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: {
    flexBasis: '30%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 14,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  mdContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6ab04c',
  },
});
