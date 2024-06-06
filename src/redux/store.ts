import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import initAxios from './_axios';
import reducer from './reducers';

const store = configureStore({
  reducer,
});

initAxios();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type TStore = typeof store;
export type RootState = ReturnType<typeof reducer>;
export default store;
