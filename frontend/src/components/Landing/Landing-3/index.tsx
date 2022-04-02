import React from 'react';
import { Box, Button, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import comfort_svg from './image.svg';
import { LandingContainerWhite, LandingTitle } from './styled';
import { LandingSubContent } from '../Landing-1/styles';
import { Slide } from 'react-awesome-reveal';

function LandingThird() {
  return (
    <LandingContainerWhite>
      <Container>
        <Stack spacing={25} direction="row" sx={{ padding: '10% 0px' }}>
          <Slide direction="right">
            <Box>
              <p>
                <img src={comfort_svg} width="150%" />
              </p>
            </Box>
            <Box>
              <LandingTitle>꼼꼼하게 평가해 산출한 치츄지수</LandingTitle>
              <LandingSubContent>
                나에게 필요한 담보와 납입기간/금액을 필터링 하고, <br />
                나에게 꼭 맞는 치아보험을 찾아보세요! <br />
                국내 10여개의 보험사, 최대 60여개의 치아보험상품을 제공해요
              </LandingSubContent>
            </Box>
          </Slide>
        </Stack>
      </Container>
    </LandingContainerWhite>
  );
}

export default LandingThird;
