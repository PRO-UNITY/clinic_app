import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getCategories } from '../../services/categories/categories';
import CategoriesCard from '../../components/categories-card/CategoriesCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { mainColor } from '../../utils/colors';

const Categories = ({ navigation }: any) => {
  const [categories, setCategories] = React.useState<any[]>([]);

  useEffect(() => {
    getCategories().then((res: any) => {
      setCategories(res);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Categories of our clinic</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            logo={category.logo}
            name={category.name}
            screen={'DoctorsOneCategory'}
            categoryId={category.id}
            navigation={navigation}
          />
        ))}
      </View>
    </ScrollView>
  );
};
export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff7e',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: mainColor,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
