import React from 'react';
import Container from '@mui/material/Container';
import ProgressBarWithNumber from '../components/Common/ProgressBarWithNumber';
import CompanyIndexModal from '../components/PlanDetail/Modal/CompanyIndexModal';
import ProductIndexModal from '../components/PlanDetail/Modal/ProductIndexModal';
import UserIndexModal from '../components/PlanDetail/Modal/UserIndexModal';
import CompanyProfile from '../components/PlanDetail/CompanyProfile';
import IndexModal from '../components/PlanDetail/Modal/ProductIndexModal';
import QuestionTooltip from '../components/PlanDetail/QuestionTooltip';
import Box from '@mui/material/Box';

function PlanDetail() {
  return (
    <div>
      <Container maxWidth="md">
        <CompanyProfile
          logo_img="./logo"
          company_name="라이나생명"
          product_name="무배당이튼튼보험"
        />
        <Box sx={{ textAlign: 'left', maxWidth: '70vw' }}>
          <hr />
          <QuestionTooltip title="치츄지수" />
          <ProgressBarWithNumber plan_score={70.5} plan_average={50} />
        </Box>
        <Box sx={{ textAlign: 'left', maxWidth: '50vw' }}>
          <CompanyIndexModal />
          <ProgressBarWithNumber plan_score={70.5} plan_average={50} />
          <ProductIndexModal />
          <ProgressBarWithNumber plan_score={70.5} plan_average={50} />
          <UserIndexModal />
          <ProgressBarWithNumber plan_score={70.5} plan_average={50} />
        </Box>
        <br />
        <p>레이더 차트</p>
      </Container>
    </div>
  );
}

export default PlanDetail;
