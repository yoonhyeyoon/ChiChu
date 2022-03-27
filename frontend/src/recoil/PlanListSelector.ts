import { selector } from 'recoil';
import customAxios from '../utils/customAxios';
import { UserAge } from './UserAge';
import { UserGender } from './UserGender';
import axios from 'axios';

export type ProductType = {
  product_code: string;
  product_name: string;
  company_code: number;
  company_name: string;
  subtype_code: number;
  rate: number;
  option_code: string;
  option_name: string;
};

export type PlanListType = {
  인기순: ProductType[];
  가성비순: ProductType[];
  '치츄 높은순': ProductType[];
  '보험료 낮은 순': ProductType[];
  '보장 높은 순': ProductType[];
};

const getData = (
  gender: number | null,
  age: number | null,
): Promise<PlanListType> =>
  axios.get(`http://j6d206.p.ssafy.io/search/default/${age}/${gender}/`);

export const PlanListSelector = selector<PlanListType | undefined>({
  key: 'PlanListSelector',
  get: async ({ get }) => {
    console.log('들어왔어요');
    const gender = get(UserGender);
    const age = get(UserAge);
    if (
      !gender ||
      !age
      // window.location.pathname != 'http://localhost:3000/search/result'
    ) {
      console.log(gender, age);
      return undefined;
    }
    try {
      const response = await getData(gender, age);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
});
