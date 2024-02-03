// import React, { useEffect } from 'react';
// import { StyleSheet, Text, ScrollView } from 'react-native';
// import { SearchBar } from 'react-native-elements';

// import Banner from '../../components/banner/Banner';
// import DoctorsCard from '../../components/doctors-card/DoctorsCard';
// import { getDoctors, getFilteredDoctors } from '../../services/doctor/doctor';
// import { Doctor } from '../../types/Doctor';

// const Home = ({ navigation }: any) => {
//   const [doctors, setDoctors] = React.useState<Doctor[]>([]);
//   const [searchQuery, setSearchQuery] = React.useState<string>('');

//   // get doctors
//   useEffect(() => {
//     getDoctors(1).then((res) => {
//       setDoctors(res.results);
//       console.log(res);
//     });
//   }, []);

//   const handleSearch = (text: string) => {
//     getFilteredDoctors(text).then((res: any) => {
//       setDoctors(res.results);
//       console.log(res.results);
//     });
//     setSearchQuery(text);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <SearchBar
//         placeholder='Search Doctors...'
//         value={searchQuery}
//         platform='default'
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
//       <Banner
//         bgColor='#cbe8fe'
//         titleColor='#054A80'
//         titles={[
//           'Consult with specialists,Prevent you from diseases!',
//           'Get special 10% discount this December',
//         ]}
//         imageUrl='https://atlas-content-cdn.pixelsquid.com/stock-images/hospital-3yL2QM6-600.jpg'
//       />
//       <Text style={styles.title}>Doctors</Text>
//       {doctors?.map((doctor: any) => (
//         <DoctorsCard
//           key={doctor.id} //
//           name={doctor.first_name}
//           rating={doctor.reviews}
//           specialty={doctor.categories ? doctor.categories : 'Urolog'}
//           imageUrl={
//             doctor.avatar
//               ? doctor.avatar
//               : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
//           }
//           icon='star'
//           iconColor='#FFC700'
//           phone={doctor.phone}
//           navigation={navigation}
//           screen={`AppointDoctor`}
//           doctorId={doctor.id}
//         />
//       ))}
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 25,
//     paddingHorizontal: 25,
//   },
//   title: {
//     fontSize: 24,
//     marginTop: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#054A80',
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

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Banner from '../../components/banner/Banner';
import DoctorsCard from '../../components/doctors-card/DoctorsCard';
import { getDoctors, getFilteredDoctors } from '../../services/doctor/doctor';
import { Doctor } from '../../types/Doctor';
import RenderFooter from '../../components/render-footer/RenderFooter';

const Home = ({ navigation }: any) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useEffect(() => {
    loadDoctors(page);
  }, [page]);

  const loadDoctors = async (currentPage: number) => {
    if (!hasMoreData || loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await getDoctors(currentPage);
      setDoctors((prevDoctors) => [...prevDoctors, ...response.results]);

      if (response.next) {
        setPage(currentPage + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    getFilteredDoctors(text).then((res: any) => {
      setDoctors(res.results);
    });
    setSearchQuery(text);
  };

  const renderItem = ({ item }: { item: Doctor }) => (
    <DoctorsCard
      key={item.id}
      name={item.first_name}
      rating={item.reviews}
      specialty={item.categories ? item.categories : 'Urolog'}
      imageUrl={
        item.avatar ||
        'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'
      }
      icon='star'
      iconColor='#FFC700'
      phone={item.phone}
      navigation={navigation}
      screen='AppointDoctor'
      doctorId={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search Doctors...'
        value={searchQuery}
        platform='default'
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
      <Banner
        bgColor='#cbe8fe'
        titleColor='#054A80'
        titles={[
          'Consult with specialists,Prevent you from diseases!',
          'Get special 10% discount this December',
        ]}
        imageUrl='https://atlas-content-cdn.pixelsquid.com/stock-images/hospital-3yL2QM6-600.jpg'
      />
      <Text style={styles.title}>Doctors</Text>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadDoctors(page)}
        ListFooterComponent={
          <RenderFooter loading={loading} hasMoreData={hasMoreData} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
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
  footer: {
    marginVertical: 20,
  },
});
