import {AnyAction, combineReducers} from '@reduxjs/toolkit';

import Companies from './Companies';

const reducers = {
  [Companies.slice.name]: Companies.slice.reducer,
};

const combinedReducer = combineReducers(reducers);

const rootReducer = (state: any, action: AnyAction) => {
  return combinedReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof combinedReducer>;
