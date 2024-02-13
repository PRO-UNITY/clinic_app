import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const Reviews = ({ route }: any) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const { doctorId } = route.params;

  console.log(doctorId);

  useEffect(() => {}, []);

  return (
    <View>
      <Text>Reviews</Text>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
