import { atom } from 'recoil';
import { PlanDataType, PlanListType, ProductType } from '../types/types';

export const PlanTaggedList = atom<
  ProductType | PlanListType | undefined | PlanDataType
>({
  key: 'PlanTaggedList',
  default: undefined,
});
