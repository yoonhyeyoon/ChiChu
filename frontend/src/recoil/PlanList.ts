import { atom } from 'recoil';

export type PlanListType = {
  age: number;
  gender: number;
};

export const PlanList = atom<PlanListType | undefined>({
  key: 'PlanList',
  default: undefined,
});
