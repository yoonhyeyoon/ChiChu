import { selector, selectorFamily } from 'recoil';
import customAxios from '../utils/customAxios';
import { PlanList } from './PlanList';
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
  option_code: string[];
  option_name: string[];
};

export type PlantListType = {
  인기순: ProductType[];
  가성비순: ProductType[];
  '치츄 높은순': ProductType[];
  '보험료 낮은 순': ProductType[];
  '보장 높은 순': ProductType[];
};

type SearchParam = {
  gender: number;
  age: number;
};

const getData = (gender: number, age: number): Promise<Response> =>
  axios.get('http://localhost:3000/api/search/default/', {
    params: { gender, age },
  });

// export const PlantListSelector = selectorFamily<PlantListType, SearchParam>({
//   key: 'PlantListSelector',
//   get:
//     (gender: number, age: number) =>
//     async ({ get }) => {
//       const response = await getData(gender, age);
//       return response;
//     },
// });
