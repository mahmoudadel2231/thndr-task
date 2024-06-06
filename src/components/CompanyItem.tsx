import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {EntityId} from '@reduxjs/toolkit';

import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
} from 'react-native-responsive-screen';

import Companies from '../redux/Companies';

import {TCompany} from '../redux/Companies/model';

const CompanyItem = ({id}: {id: EntityId}) => {
  const singleProductItem = useSelector(state =>
    Companies.selectors.selectById(state, id),
  ) as TCompany;

  // console.log('singleProductItem', id, singleProductItem);

  return (
    <View style={styles.companyContainer}>
      <Text style={styles.boldTextStyle}>{singleProductItem?.ticker}</Text>
      <Text numberOfLines={3} style={styles.textStyle}>
        {singleProductItem?.name}
      </Text>
    </View>
  );
};

export default CompanyItem;

const styles = StyleSheet.create({
  companyContainer: {
    width: WP(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232639',
    marginBottom: HP(2),
    paddingVertical: HP(5),
    borderRadius: 7,
  },
  textStyle: {color: 'white', textAlign: 'center'},
  boldTextStyle: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
