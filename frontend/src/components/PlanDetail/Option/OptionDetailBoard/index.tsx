import React from 'react';
import { DT, DD_RIGHT, DD_LEFT, JisuText } from '../styles';
import { Box } from '@mui/material';

type PropType = {
  option_detail: {
    NAME: string;
    COVERAGE: number;
  }[];
};

export function OptionDetailBoard(props: PropType) {
  console.log(props.option_detail);
  return (
    <Box>
      <DT style={{ margin: '20px 0', padding: '10px 10px' }}>
        <JisuText>상세보장내역</JisuText>
      </DT>
      {props.option_detail.map(item => {
        return (
          <dd>
            <DD_LEFT>{item['NAME']}</DD_LEFT>
            <DD_RIGHT>
              {item['COVERAGE'] === 0
                ? '-'
                : `${item['COVERAGE'].toLocaleString()}원`}
            </DD_RIGHT>
          </dd>
        );
      })}
    </Box>
  );
}
