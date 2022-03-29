import { atom } from 'recoil';
import { PlanDataType, PlanListType, ProductType } from '../types/types';

export const PlanFilteredList = atom<PlanListType | undefined | PlanDataType>({
  key: 'PlanFilteredList',
  default: undefined,
});
