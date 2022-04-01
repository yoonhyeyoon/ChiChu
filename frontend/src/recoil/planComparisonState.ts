import { atom } from 'recoil';

export const checkedPlanListState = atom<string[]>({
  key: 'checkedPlanListState',
  default: [],
});
