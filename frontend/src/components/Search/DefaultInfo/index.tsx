import React from 'react';
import { DefaultBold, DefaultBox } from './styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function DefaultInfo() {
  return (
    <div>
      <p>치아보험, 우선 이 조건으로 찾아볼게요!</p>
      <DefaultBox>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Box>
            <span>납입기간</span>
            <DefaultBold>10년</DefaultBold>
          </Box>
          <Box>
            <span>보험기간</span>
            <DefaultBold>10년</DefaultBold>
          </Box>
          <Box>
            <DefaultBold>기본보장</DefaultBold>
          </Box>
        </Stack>
      </DefaultBox>
    </div>
  );
}

export default DefaultInfo;
