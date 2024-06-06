import {createEntityAdapter} from '@reduxjs/toolkit';

import type {TCompany} from './model';

const adapter = createEntityAdapter<TCompany, any>({
  selectId: company => company.ticker,
});

export default adapter;
