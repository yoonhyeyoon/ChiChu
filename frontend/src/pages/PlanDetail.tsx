import React from 'react';
import Container from '@mui/material/Container';
import ProgressBarWithNumber from '../components/Common/ProgressBarWithNumber';
import CompanyIndexModal from '../components/PlanDetail/Modal/CompanyIndexModal/index';
import ProductIndexModal from '../components/PlanDetail/Modal/ProductIndexModal/index';
import UserIndexModal from '../components/PlanDetail/Modal/UserIndexModal/index';
import { OptionBoard } from '../components/PlanDetail/OptionBoard/index';
import CompanyProfile from '../components/PlanDetail/CompanyProfile';
import QuestionTooltip from '../components/PlanDetail/QuestionTooltip';
import DetailSample from '../components/PlanDetail/DetailSample.json';
import Box from '@mui/material/Box';

function PlanDetail() {
  const sample = DetailSample;

  return (
    <div>
      <Container maxWidth="md">
        <CompanyProfile
          company_name={sample.base[0].COMPANY_NAME}
          product_name={sample.base[0].PRODUCT_NAME}
        />
        <Box sx={{ textAlign: 'left', maxWidth: '70vw' }}>
          <hr />
          <QuestionTooltip title="치츄지수" />
          <ProgressBarWithNumber
            plan_score={sample.base[0].TOTAL_INDEX}
            plan_average={69.24}
          />
        </Box>
        <Box sx={{ textAlign: 'left', maxWidth: '50vw' }}>
          <CompanyIndexModal />
          <ProgressBarWithNumber
            plan_score={sample.base[0].COMPANY_INDEX}
            plan_average={63.46}
          />
          <ProductIndexModal />
          <ProgressBarWithNumber
            plan_score={sample.base[0].PRODUCT_INDEX}
            plan_average={50.78}
          />
          <UserIndexModal />
          <ProgressBarWithNumber
            plan_score={sample.base[0].USER_INDEX}
            plan_average={9.59}
          />
        </Box>
        <br />
        <OptionBoard option={sample['option']} />
      </Container>
    </div>
  );
}

export default PlanDetail;
