import React, {useEffect, useState} from 'react';

import BootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';
import {Image, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';

import Companies from '../redux/Companies';
import {useAppDispatch} from '../redux/store';
import {RootState} from '../redux/reducers';
import CompanyItem from '../components/CompanyItem';
import SafeEndFlatList from '../components/SafeEndFlatList';

function Home(): React.JSX.Element {
  const [search, setSearchText] = useState<string>('');
  const dispatch = useAppDispatch();
  const currentCompanies = useSelector(
    (state: RootState) => state.companies.companies,
  );

  let nextURL = useSelector((state: RootState) => state.companies?.nextURL);

  useEffect(() => {
    const init = async () => {
      dispatch(
        Companies.thunks.fetchCompaniesList({
          params: {
            limit: 10,
          },
        }),
      ).then(() => {});
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, [dispatch]);

  const searchData = () => {
    dispatch(
      Companies.thunks.fetchCompaniesList({
        params: {
          search,
          refresh: true,
        },
      }),
    ).then(() => {});
  };
  let fetchMoreData = () => {
    dispatch(
      Companies.thunks.fetchCompaniesPaginationList({
        params: {
          nextURL,
          search,
        },
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={require('../assets/logo.png')}
          style={styles.imageContainer}
        />
      </View>
      <TextInput
        style={styles.textInput}
        value={search}
        onChangeText={text => setSearchText(text || '')}
        onEndEditing={searchData}
        placeholder="Search for stocks"
        placeholderTextColor="white"
      />
      <SafeEndFlatList
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        data={currentCompanies}
        renderItem={item => {
          return <CompanyItem id={item?.item} />;
        }}
        columnWrapperStyle={styles.columnWrapperStyle}
        onListEndReach={fetchMoreData}
        onEndReachedThreshold={0.7}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#1f202f', flex: 1},
  logoContainer: {
    width: WP(100),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: HP(2),
    backgroundColor: '#191a28',
  },
  imageContainer: {
    width: WP(50),
    height: HP(5),
    alignSelf: 'flex-start',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: WP(4),
  },
  textInput: {
    width: WP(90),
    alignSelf: 'center',
    height: HP(5),
    backgroundColor: '#232639',
    marginBottom: HP(2),
    borderRadius: 7,
    color: 'white',
  },
});

export default Home;
