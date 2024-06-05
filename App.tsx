/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import BootSplash from 'react-native-bootsplash';

// 2zxx0GM3tl_mRMrpzcmwol6IiqCWiq3K
// /v3/reference/tickers
// https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=2zxx0GM3tl_mRMrpzcmwol6IiqCWiq3K

type hide = (config?: {fade?: boolean}) => Promise<void>;

function App(): React.JSX.Element {
  const [data, setData] = useState();
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  useEffect(() => {
    axios
      .get('https://api.polygon.io/v3/reference/tickers?active=true', {
        params: {
          limit: 1000,
          apiKey: '2zxx0GM3tl_mRMrpzcmwol6IiqCWiq3K',
        },
      })
      .then(response => {
        setData(response.data.results);
        console.log(response.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#1f202f', flex: 1}}>
      <FlatList
        data={data}
        renderItem={item => {
          return (
            <View>
              <Text style={{color: 'white'}}>{item.item?.name}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
