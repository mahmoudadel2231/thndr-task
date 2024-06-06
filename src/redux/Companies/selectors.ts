import {EntityKeys} from '../schema';

import adapter from './adapter';

import type {TCompany} from './model';
import type {EntitySelectors} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface TCompanysSelector extends EntitySelectors<TCompany, any, any> {}

const adapterSelectors: EntitySelectors<TCompany, any, any> =
  adapter.getSelectors((state: RootState) => state[EntityKeys.COMPANIES]);

const selectors: TCompanysSelector = {...adapterSelectors};

export default selectors;
