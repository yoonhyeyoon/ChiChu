import * as React from 'react';
import { Box, Button } from '@mui/material';
import { textAlign } from '@mui/system';
import { BOX_RIGHT, DD_RIGHT, DD_LEFT } from './styles';
import { CustomButtonRoot } from '../../Common/Button/styles';

// Box로 되서 text-align: right
// 성별, 나이 기준
// hr
// 납입기간, 보장기간
// hr
// 월 {rate} 원
// 보험사이트 가기 버튼.
type PropType = {
  gender: string;
  age: number;
  rate: number;
  py: number;
  link: string;
};

function RightBox(props: PropType) {
  let gender_str = '';

  if (props.gender === '1') {
    gender_str = '남성';
  } else if (props.gender === '2') {
    gender_str = '여성';
  } else {
    gender_str = '성별 알수 없음';
  }

  return (
    <BOX_RIGHT>
      <p>
        {gender_str}, {props.age}세 기준
      </p>
      <hr />
      <div>
        <DD_LEFT>납입기간</DD_LEFT>
        <DD_RIGHT>{props.py}년</DD_RIGHT>
      </div>
      <div>
        <DD_LEFT>보장기간</DD_LEFT>
        <DD_RIGHT>{props.py}년</DD_RIGHT>
      </div>
      <hr />
      <h1>월 {props.rate.toLocaleString()}원</h1>
      <CustomButtonRoot style={{ margin: '0px' }}>
        보험사 사이트 가기
      </CustomButtonRoot>
    </BOX_RIGHT>
  );
}

export default RightBox;
