// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { getCategories } from '../../services/categories/categories';
// import CategoriesCard from '../../components/categories-card/CategoriesCard';
// import { SearchBar } from 'react-native-elements';

// const Categories = ({ navigation }: any) => {
//   const [searchText, setSearchText] = React.useState<string>('');
//   const [categories, setCategories] = React.useState<any[]>([]);
//   useEffect(() => {
//     getCategories().then((res: any) => {
//       setCategories(res);
//     });
//   }, []);

//   const handleSearch = (text: string) => {
//     setSearchText(text);
//   };

//   return (
//     <View style={styles.container}>
//       <SearchBar
//         placeholder='Search Categories...'
//         platform='default'
//         value={searchText}
//         containerStyle={styles.searchBarContainer}
//         inputContainerStyle={styles.searchBarInputContainer}
//         loadingProps={{}}
//         showLoading={false}
//         lightTheme={false}
//         round={false}
//         onClear={() => {}}
//         onFocus={() => {}}
//         onBlur={() => {}}
//         //@ts-ignore
//         onChangeText={(text: any) => handleSearch(text)}
//       />
//       <View style={styles.categoryContainer}>
//         {categories.map((category) => (
//           <CategoriesCard
//             key={category.id}
//             logo={category.logo}
//             name={category.name}
//             screen={'DoctorsOneCategory'}
//             categoryId={category.id}
//             navigation={navigation}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };
// export default Categories;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#ffffff7e',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   // search bar
//   searchBarContainer: {
//     backgroundColor: 'transparent',
//     borderBottomColor: 'transparent',
//     borderTopColor: 'transparent',
//     marginBottom: 16,
//   },
//   searchBarInputContainer: {
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//   },
// });

import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getCategories } from '../../services/categories/categories';
import CategoriesCard from '../../components/categories-card/CategoriesCard';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mainColor } from '../../utils/colors';

const Categories = ({ navigation }: any) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [categories, setCategories] = React.useState<any[]>([]);
  const route = useRoute();

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
