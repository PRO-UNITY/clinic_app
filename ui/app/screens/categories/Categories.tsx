import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getCategories } from '../../services/categories/categories';
import CategoriesCard from '../../components/categories-card/CategoriesCard';
import { SearchBar } from 'react-native-elements';

const Categories = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [categories, setCategories] = React.useState<any[]>([]);
  useEffect(() => {
    getCategories().then((res: any) => {
      setCategories(res);
    });
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search Categories...'
        platform='default'
        value={searchText}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        loadingProps={{}}
        showLoading={false}
        lightTheme={false}
        round={false}
        onClear={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        //@ts-ignore
        onChangeText={(text: any) => handleSearch(text)}
      />
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            logo={category.logo}
            name={category.name}
          />
        ))}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  // search bar
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 16,
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});
