// ProfileListItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileListItemProps {
  label: string;
  value: string;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({ label, value }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ProfileListItem;
