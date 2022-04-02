import React from 'react';
import { Box, Button, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LandingContent, LandingSubContent } from '../Landing-1/styles';
import {
  LandingContainerBlue,
  LandingSubContentColor,
  LandingTitleWhite,
} from './styles';
import comfort_svg from './image.svg';

function LandingSecond() {
  return (
    <LandingContainerBlue>
      <Container>
        <Stack spacing={10} direction="row" sx={{ padding: '10% 0px' }}>
          <Box>
            <LandingTitleWhite>
              다양한 보험상품을 한 번에 비교
            </LandingTitleWhite>
            <LandingSubContentColor>
              나에게 필요한 담보와 납입기간/금액을 필터링 하고, <br />
              나에게 꼭 맞는 치아보험을 찾아보세요! <br />
              국내 10여개의 보험사, 최대 60여개의 치아보험상품을 제공해요
            </LandingSubContentColor>
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

export default LandingSecond;
