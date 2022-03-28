import React, { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserGender } from '../recoil/UserGender';
import { UserAge } from '../recoil/UserAge';
import ProgressBarWithNumber from '../components/Common/ProgressBarWithNumber';
import CompanyIndexModal from '../components/PlanDetail/Modal/CompanyIndexModal/index';
import ProductIndexModal from '../components/PlanDetail/Modal/ProductIndexModal/index';
import UserIndexModal from '../components/PlanDetail/Modal/UserIndexModal/index';
import { OptionBoard } from '../components/PlanDetail/OptionBoard/index';
import { OptionDetailBoard } from '../components/PlanDetail/OptionDetailBoard/index';
import CompanyProfile from '../components/PlanDetail/CompanyProfile';
import QuestionTooltip from '../components/PlanDetail/QuestionTooltip';
import DetailSample from '../components/PlanDetail/DetailSample.json';
import { PieChart } from '../components/PlanDetail/PieChart/index';
import { RadarChart } from '../components/PlanDetail/RadarChart/index';
import { Box, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';

const info = DetailSample;

interface CustomState {
  [x: string]: any;
  state: {
    product_code: string;
  };
}

// type InfoType = {
//   age_rage: Array<{ AGE_CAT: number; RATE: string }>;
//   base: Array<{
//     AGE: number;
//     COMPANY_CODE: string;
//     COMPANY_INDEX: number;
//     COMPANY_NAME: string;
//     GENDER: string;
//     PRODUCT_CODE: string;
//     PRODUCT_INDEX: number;
//     PRODUCT_NAME: string;
//     PY: number;
//     RATE: number;
//     TOTAL_INDEX: number;
//     USER_INDEX: number;
//   }>;
//   option: Array<{ NAME: string; COVERAGE: string }>;
//   option_column: Array<{ ID: string; OPTION_NAME: string }>;
//   option_detail: Array<{ NAME: string; COVERAGE: string }>;
//   option_group: Array<{ NAME: string; COVERAGE: string }>;
// };

function PlanDetail() {
  const location = useLocation();
  const state = location.state as CustomState;
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);
  // const userPeriod = useRecoilValue(UserPeriod);

  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // const [info, setInfo] = useState<InfoType>({
  //   age_rage: [],
  //   base: [],
  //   option: [],
  //   option_column: [],
  //   option_detail: [],
  //   option_group: [],
  // });

  const getProductInfo = () => {
    const credentials = {
      age: userAge,
      gender: userGender,
      product_code: state.product_code,
      py: 10,
    };
    axios
      .get(
        `/product/${credentials.product_code}/${credentials.age}/${credentials.gender}/${credentials.py}`,
      )
      .then(res => {
        console.log(res.data);
        // setInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(userAge, userGender, state.product_code);
    getProductInfo();
    // console.log(info);
  }, []);

  // 안들어왔을 때는 로딩 떠있도록.
  // if (!info) {
  //   return (
  //     <div>
  //       <span>Loading...</span>
  //     </div>
  //   );
  // }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {loading === false ? (
          <div>
            <Container maxWidth="md">
              <Box sx={{ textAlign: 'left', maxWidth: '70vw' }}>
                <CompanyProfile
                  company_name={info.base[0]['COMPANY_NAME']}
                  product_name={info.base[0]['PRODUCT_NAME']}
                />
              </Box>
              <Box sx={{ textAlign: 'left', maxWidth: '70vw' }}>
                <hr />
                <QuestionTooltip title="치츄지수" />
                <ProgressBarWithNumber
                  plan_score={info.base[0]['TOTAL_INDEX']}
                  plan_average={69.24}
                />
              </Box>
              <Box sx={{ textAlign: 'left', maxWidth: '50vw' }}>
                <CompanyIndexModal />
                <ProgressBarWithNumber
                  plan_score={info.base[0]['COMPANY_INDEX']}
                  plan_average={63.46}
                />
                <ProductIndexModal />
                <ProgressBarWithNumber
                  plan_score={info.base[0]['PRODUCT_INDEX']}
                  plan_average={50.78}
                />
                <UserIndexModal />
                <ProgressBarWithNumber
                  plan_score={info.base[0]['USER_INDEX']}
                  plan_average={9.59}
                />
              </Box>
              <br />
              <Box sx={{ maxWidth: '70vw' }}>
                <OptionBoard option={info['option']} />
                <Box>
                  <Button onClick={() => setShowMore(cur => !cur)}>
                    {showMore ? '접기' : '보장 자세히 보기'}
                    {showMore ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </Button>
                </Box>
                {showMore && (
                  <>
                    <OptionDetailBoard option_detail={info['option_detail']} />
                  </>
                )}
              </Box>
              <br />
              <PieChart age_rate={info['age_rate']} />
              <br />
              <RadarChart />
            </Container>
          </div>
        ) : (
          <div>
            <span>Loading...</span>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default PlanDetail;
