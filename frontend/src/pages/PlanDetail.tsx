import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserGender } from '../recoil/UserGender';
import { UserAge } from '../recoil/UserAge';
import { Box, Button } from '@mui/material';
import CompanyIndexModal from '../components/PlanDetail/Modal/CompanyIndexModal/index';
import ProductIndexModal from '../components/PlanDetail/Modal/ProductIndexModal/index';
import UserIndexModal from '../components/PlanDetail/Modal/UserIndexModal/index';
import { OptionBoard } from '../components/PlanDetail/Option/OptionBoard/index';
import { OptionDetailBoard } from '../components/PlanDetail/Option/OptionDetailBoard/index';
import CompanyProfile from '../components/PlanDetail/CompanyProfile';
import QuestionTooltip from '../components/PlanDetail/QuestionTooltip';
import DetailSample from '../components/PlanDetail/DetailSample.json';
import { PieChart } from '../components/PlanDetail/PieChart/index';
import { RadarChart } from '../components/PlanDetail/RadarChart/index';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import RightBox from '../components/PlanDetail/RightBox';
import {
  Board,
  OptionBoxButton,
  GreyRegularText,
  NormalRegularText,
  NormalBoldText,
} from '../components/PlanDetail/styles';
import Header from '../components/Common/Header';
import ProgressBar from '../components/PlanDetail/ProgressBar';
import IndexBox from '../components/PlanDetail/IndexBox';
import { StylesProvider } from '@material-ui/core/styles';
import { textAlign } from '@mui/system';

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
              <CompanyProfile
                company_name={info.base[0]['COMPANY_NAME']}
                product_name={info.base[0]['PRODUCT_NAME']}
              />
              <ProgressBar
                plan_score={info.base[0]['TOTAL_INDEX']}
                plan_average={69.24}
              />
              <IndexBox
                CompanyIndex={info.base[0]['COMPANY_INDEX']}
                ProductIndex={info.base[0]['PRODUCT_INDEX']}
                UserIndex={info.base[0]['USER_INDEX']}
              />
              <br />

              <OptionBoard option={info['option']} />

              <OptionBoxButton
                onClick={() => setShowMore(cur => !cur)}
                style={{
                  padding: '0',
                  marginLeft: '24vw',
                  textAlign: 'center',
                  color: '#1a90ff',
                }}
              >
                {showMore ? (
                  <NormalBoldText style={{ fontSize: '16px' }}>
                    {'접기'}
                  </NormalBoldText>
                ) : (
                  <NormalBoldText style={{ fontSize: '16px' }}>
                    {'보장 자세히 보기'}
                  </NormalBoldText>
                )}
                {showMore ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </OptionBoxButton>

              {showMore && (
                <OptionDetailBoard option_detail={info['option_detail']} />
              )}
              <br />
              <GreyRegularText
                style={{
                  textAlign: 'left',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                보험 가입자 연령 분포
              </GreyRegularText>
              <PieChart age_rate={info['age_rate']} />
              <br />
              <GreyRegularText
                style={{ textAlign: 'left', marginBottom: '10px' }}
              >
                상대적 보장우위
              </GreyRegularText>

              <RadarChart option_group={info['option_group']} />
              <br />
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
