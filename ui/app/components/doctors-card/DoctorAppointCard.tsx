import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from '../../utils/colors';
import moment from 'moment';

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
  date?: any;
  time?: any;
  status?: any;
  onCancelConfirmation?: any;
  onRescheduleAppointment?: any;
}

const DoctorAppointCard: React.FC<CardProps> = ({
  imageUrl,
  name,
  rating,
  specialty,
  icon,
  iconColor,
  navigation,
  // screen,
  doctorId,
  date,
  time,
  status,
  onCancelConfirmation,
  onRescheduleAppointment,
}) => {
  return (
    <TouchableOpacity
    //  onPress={() => navigation.navigate(screen, { doctorId })}
    >
      <View style={styles.main}>
        <View style={styles.cardTitle}>
          <Text style={styles.textTitle}>Doctor</Text>
          <View style={styles.iconsContainer}>
            {status === 'IN_PROGRESS' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat', { doctorId })}
                style={styles.chatButton}
              >
                <Icon name='chatbox' size={16} color='white' />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => onRescheduleAppointment(doctorId)}
              style={styles.rescheduleButton}
            >
              <Icon name='reload' size={16} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onCancelConfirmation(doctorId)}
              style={styles.cancelButton}
            >
              <Icon name='close' size={16} color='white' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>dr. {name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{rating} Review</Text>
              <Text style={styles.ratingText}>{specialty} Category</Text>
            </View>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateStatusTexts}>
            <Text>
              Date:{' '}
              <Text style={styles.dateText}>
                {moment(date, 'YYYY-MM-DD - HH:mm:ss').format('YYYY-MM-DD')}
              </Text>{' '}
            </Text>
            <Text>
              Time:{' '}
              <Text style={styles.dateText}>
                {moment(time, 'YYYY-MM-DD - HH:mm:ss').format('HH:mm')}
              </Text>{' '}
            </Text>
            <View style={styles.statusContainer}>
              <Icon
                name={icon || ''}
                style={[styles.starIcon, { color: iconColor }]}
              />
              <Text style={styles.textBold}>{status}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorAppointCard;

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    flexDirection: 'column',
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingRight: 5,
    gap: 8,
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
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: mainColor,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  dateStatusTexts: {
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#DE1621',
    padding: 8,
    borderRadius: 8,
  },
  chatButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
  },
  rescheduleButton: {
    backgroundColor: '#9c88ff',
    padding: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
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
    fontSize: 18,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    maxWidth: 150,
    overflow: 'hidden',
    fontSize: 14,
    color: '#404446',
  },
  timeText: {
    maxWidth: 150,
    overflow: 'hidden',
    fontSize: 14,
    color: '#404446',
  },
  textBold: {
    fontWeight: 'bold',
  },
});
