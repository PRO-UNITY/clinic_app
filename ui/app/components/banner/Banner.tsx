import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

interface BannerProps {
  titles: string[];
  imageUrl?: string;
  bgColor?: string;
  titleColor?: string;
}

const Banner: React.FC<BannerProps> = ({
  titles,
  imageUrl,
  bgColor,
  titleColor,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.titlesContainer}>
        <Text style={[styles.titleHeader, { color: titleColor }]}>
          {titles[0]}
        </Text>
        <Text style={[styles.titleBody, { color: titleColor }]}>
          {titles[1]}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    color: '#fff',
    borderRadius: 10,
  },
  titlesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleBody: {
    fontSize: 16,
  },
  imageContainer: {
    padding: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
  },
});
