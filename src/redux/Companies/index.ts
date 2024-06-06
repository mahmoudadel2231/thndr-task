import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import {EntityKeys, CompanySchema} from '../schema';

import adapter from './adapter';
import selectors from './selectors';
import * as thunks from './thunks';
import {Alert} from 'react-native';

type TInitialState = {companies: number[]; nextURL: string};

const slice = createSlice({
  name: EntityKeys.COMPANIES,
  initialState: adapter.getInitialState<TInitialState>({
    companies: [],
    nextURL: '',
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          thunks.fetchCompaniesList.fulfilled,
          thunks.fetchCompaniesPaginationList.fulfilled,
        ),
        (state, action: any) => {
          if (action?.payload?.refresh) {
            state.companies = [];
          }
          state.companies = [...state.companies, ...action?.payload?.result];
          state.nextURL = action?.payload?.nextURL;
          adapter.upsertMany(state, action?.payload?.entities?.companies);
        },
      )
      .addMatcher(
        isAnyOf(
          thunks.fetchCompaniesList.rejected,
          thunks.fetchCompaniesPaginationList.rejected,
        ),
        (state, action: any) => {
          if (action?.payload?.refresh) {
            state.companies = [];
          }
          Alert.alert(action.payload);
        },
      );
  },
});

const Companies = {
  adapter,
  thunks,
  slice,
  schema: CompanySchema,
  selectors,
};
export default Companies;
