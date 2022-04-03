import React, { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserGender } from '../recoil/UserGender';
import { UserAge } from '../recoil/UserAge';
import { Box, Button } from '@mui/material';
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import RightBox from '../components/PlanDetail/RightBox';
import { Board } from '../components/PlanDetail/styles';
import Header from '../components/Common/Header';

// const info = DetailSample;

interface CustomState {
  [x: string]: any;
  state: {
    product_code: string;
  };
}

type InfoType = {
  age_rage: { AGE_CAT: number; RATE: string }[];
  base: {
    AGE: number;
    COMPANY_CODE: string;
    COMPANY_INDEX: number;
    COMPANY_NAME: string;
    GENDER: string;
    PRODUCT_CODE: string;
    PRODUCT_INDEX: number;
    PRODUCT_NAME: string;
    PY: number;
    RATE: number;
    TOTAL_INDEX: number;
    USER_INDEX: number;
  };
  option: {
    NAME: string;
    COVERAGE: number;
  }[];
  option_column: { ID: string; OPTION_NAME: string }[];
  option_detail: { NAME: string; COVERAGE: number }[];
  option_group: { NAME: string; COVERAGE: number; RATE: number }[];
};

function PlanDetail() {
  const location = useLocation();
  const state = location.state as CustomState;
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);

  const [showMore, setShowMore] = useState(false);
  const [info, setInfo] = useState<InfoType | null>(null);

  const getProductInfo = () => {
    const credentials = {
      age: userAge,
      gender: userGender,
      product_code: state.product_code,
      py: state.py,
    };
    axios
      .get(
        `/product/${credentials.product_code}/${credentials.age}/${credentials.gender}/${credentials.py}`,
      )
      .then(res => {
        setInfo(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(userAge, userGender, state.py, state.product_code);
    getProductInfo();
  }, []);

  //안들어왔을 때는 로딩 떠있도록.
  if (!info) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <div>
          <Board>
            <Container maxWidth="md">
              <Box
                sx={{
                  paddingTop: 15,
                  textAlign: 'left',
                  maxWidth: '70vw',
                }}
              >
                <CompanyProfile
                  company_name={info.base[0]['COMPANY_NAME']}
                  product_name={info.base[0]['PRODUCT_NAME']}
                />
              </Box>
              <Box sx={{ textAlign: 'left', maxWidth: '70vw' }}>
                <hr />
                <QuestionTooltip />
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
              <RadarChart option_group={info['option_group']} />
            </Container>
            <div>
              <RightBox
                gender={userGender ? userGender : 0}
                age={userAge ? userAge : 0}
                rate={info.base[0]['RATE']}
                py={info.base[0]['PY']}
                link={info.base[0]['PRODUCT_LINK']}
              ></RightBox>
            </div>
          </Board>
        </div>
      </>
    );
  }
}

export default PlanDetail;
