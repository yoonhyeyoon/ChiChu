import { atom } from 'recoil';
import { PlanDataType, PlanListType, ProductType } from '../types/types';

export const PlanFilteredList = atom<
  PlanListType | ProductType | undefined | PlanDataType
>({
  key: 'PlanFilteredList',
  default: undefined,
});
