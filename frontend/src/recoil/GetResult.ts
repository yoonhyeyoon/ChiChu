import { selector } from 'recoil';
import customAxios from '../utils/customAxios';
import { PlanList } from './PlanList';
import { UserAge } from './UserAge';
import { UserGender } from './UserGender';
import axios from 'axios';

// export type ProductType = {
//   product_code: string;
//   product_name: string;
//   company_code: number;
//   company_name: string;
//   subtype_code: number;
//   rate: number;
//   option_code: string[];
//   option_name: string[];
// };

// export type SearchResultListType = {
//   인기순: ProductType[];
//   가성비순: ProductType[];
//   '치츄 높은순': ProductType[];
//   '보험료 낮은 순': ProductType[];
//   '보장 높은 순': ProductType[];
// };

// export default selector<SearchResultListType>({
//   key: 'GetResult',
//   get: async ({ get }) => {
//     // const planListData = get(PlanList);
//     // if (
//     //   planListData == undefined ||
//     //   window.location.pathname != ""
//     // )
//     //   return undefined;

//     // const { age, gender } = planListData;
//     const age = get(UserAge);
//     const gender = get(UserGender);
//     const response = await axios.get('http://localhost:3000/api/search/default/', { params: { age, gender } })
//     return response;
//   },
//   // set: ({ get, set }) => {
//   //   const age = get(UserAge);
//   //   const gender = get(UserGender);

//   //   set(PlanList, { age, gender });
//     // set(UserAge, null);
//     // set(UserGender, null);
//   // },
// });
