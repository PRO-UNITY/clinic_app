import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { PatientsCardProps } from '../../types/Patient/PatientCard';

const PatientsCard: React.FC<PatientsCardProps> = ({
  first_name,
  content,
  imageUrl,
  icon,
  iconColor,
  gender,
  status,
  screen,
  navigation,
  patientId,
}) => {
  return (
    <Pressable onPress={() => navigation.navigate(screen, { patientId })}>
      <View style={styles.container}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Name: {first_name}</Text>
          <Text style={styles.contentText}>{content}</Text>
          <View style={styles.ratingContainer}>
            {/* @ts-ignore */}
            <Icon name={icon} style={[styles.starIcon, { color: iconColor }]} />
            <Text style={styles.statusText}>{status}</Text>
            <Text style={styles.genderText}>{gender}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PatientsCard;
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
  statusText: {
    fontSize: 14,
    color: '#404446',
  },
  genderText: {
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
  contentText: {
    color: '054A80',
  },
});
