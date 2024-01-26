import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface CardProps {
  name?: string;
  specialty?: string;
  rating?: number;
  imageUrl?: string;
  phone?: string;
  icon?: string;
  iconColor?: any;
  navigation?: any;
  screen?: string;
  doctorId?: any;
}

const DoctorsCard: React.FC<CardProps> = ({
  imageUrl,
  name,
  rating,
  specialty,
  phone,
  icon,
  iconColor,
  navigation,
  screen,
  doctorId,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen, { doctorId })}>
      <View style={styles.container}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>dr. {name}</Text>
          <Text style={styles.phoneText}>{phone}</Text>

          <View style={styles.ratingContainer}>
            {/* @ts-ignore */}
            <Icon name={icon} style={[styles.starIcon, { color: iconColor }]} />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.ratingText}>{specialty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: 'white',
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  textContainer: {
    gap: 4,
    alignItems: 'flex-start',
    marginTop: -8,
    color: '#404446',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#404446',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#404446',
  },
  starIcon: {
    fontSize: 16,
  },
  phoneText: {
    color: '054A80',
  },
});
