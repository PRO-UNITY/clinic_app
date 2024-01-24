import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import React from 'react';
import { Category } from '../../types/Category';
import { mainColor } from '../../utils/colors';

const CategoriesCard: React.FC<Category> = ({ logo, name }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <Text style={styles.textName}>{name}</Text>
    </View>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textName: {
    fontSize: 16,
    color: mainColor,
    fontWeight: 'bold',
  },
});
