import { atom, selector } from 'recoil';
import customAxios from '../utils/customAxios';
import { UserAge } from './UserAge';
import { UserGender } from './UserGender';
import axios from 'axios';
import { PlanDataType, PlanListType, ProductType } from '../types/types';
import { PlanFilteredList } from './PlanFilteredList';
import { UserPeriod } from './UserPeriod';

const getData = (
  gender: number | null,
  age: number | null,
  period: number | null,
): Promise<PlanDataType> =>
  axios.get(
    `http://127.0.0.1:8000/api/search/detail/${age}/${gender}/${period}`,
  );

export const PlanListSelector = selector<
  PlanDataType | undefined | PlanListType
>({
  key: 'PlanListSelector',
  get: async ({ get }) => {
    console.log('들어왔어요');
    const gender = get(UserGender);
    const age = get(UserAge);
    const period = get(UserPeriod);
    if (
      !gender ||
      !age
      // window.location.pathname != 'http://localhost:3000/search/result'
    ) {
      console.log(gender, age, period);
      return undefined;
    }
    try {
      const response = await getData(gender, age, period);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  set: ({ set }, newValue) => {
    set(PlanFilteredList, newValue);
    console.log('set에 들어어어어왔어');
    // 납입기간 초기화
    // set(UserPeriod, 10);
  },
});
