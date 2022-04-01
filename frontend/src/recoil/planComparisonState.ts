import { atom } from 'recoil';
import { PlanPickerType } from '../types/types';

export const checkedPlanListState = atom<PlanPickerType[]>({
  key: 'checkedPlanListState',
  default: [],
});
