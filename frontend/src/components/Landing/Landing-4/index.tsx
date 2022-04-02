import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LandingContent, LandingSubContent } from '../Landing-1/styles';
import comfort_svg from './image.svg';
import {
  LandingContainerBlue,
  LandingSubContentColor,
  LandingTitleWhite,
} from '../Landing-2/styles';
import { CustomTipButtonRoot } from './styles';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomTipButtonRoot} />;
}

function LandingFourth() {
  const navigate = useNavigate();
  return (
    <LandingContainerBlue>
      <Container>
        <Stack spacing={10} direction="row" sx={{ padding: '10% 0px' }}>
          <Box>
            <LandingTitleWhite>치츄만의 치아보험 선택 가이드</LandingTitleWhite>
            <LandingSubContentColor>
              복잡하고 어려운 치아보험이 낯선가요? 🤔 <br />
              나에게 꼭 맞는 치아보험을 찾아보세요! <br />
              국내 10여개의 보험사, 최대 60여개의 치아보험상품을 제공해요
            </LandingSubContentColor>
            <CustomButton onClick={() => navigate('/')}>
              보험TIP 바로가기
            </CustomButton>
          </Box>
          <Box>
            <p>
              <img src={comfort_svg} width="150%" />
            </p>
          </Box>
        </Stack>
      </Container>
    </LandingContainerBlue>
  );
}

export default LandingFourth;
