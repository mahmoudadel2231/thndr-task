import {createAsyncThunk} from '@reduxjs/toolkit';
import {normalize} from 'normalizr';

import CompaniesAPI from './services';
import {CompanySchema} from '../schema';
import {Alert} from 'react-native';

export const fetchCompaniesList = createAsyncThunk<any, any>(
  'companies/fetchAll',
  async ({params}, {rejectWithValue}) => {
    try {
      const response = await CompaniesAPI.fetchCompaniesList(params);
      if (response.data?.results.length !== 0) {
        const normalized = normalize(
          response.data?.results,
          CompanySchema.list,
        );
        let nextURL = response.data?.next_url;
        return {
          ...normalized,
          nextURL,
          search: params?.search,
          refresh: params?.refresh,
        };
      } else {
        Alert.alert('no search results');
        return {refresh: true};
      }
    } catch (error: any) {
      return rejectWithValue(error?.data?.error);
    }
  },
);

export const fetchCompaniesPaginationList = createAsyncThunk<any, any>(
  'companies/fetchPagination',
  async ({params}, {rejectWithValue}) => {
    try {
      const response = await CompaniesAPI.fetchCompaniesPaginationList(params);
      const normalized = normalize(response.data?.results, CompanySchema.list);
      let nextURL = response.data?.next_url;
      return {
        ...normalized,
        nextURL,
        search: params?.search,
      };
    } catch (error: any) {
      return rejectWithValue(error?.data?.error);
    }
  },
);
