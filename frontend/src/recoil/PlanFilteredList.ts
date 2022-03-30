import { atom } from 'recoil';
import { PlanDataType, PlanListType, ProductType } from '../types/types';

export const PlanFilteredList = atom<PlanDataType | undefined | PlanListType>({
  key: 'PlanFilteredList',
  default: undefined,
});
