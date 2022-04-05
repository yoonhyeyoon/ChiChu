import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalBoldSpan,
} from '../../styles';
import BasicTable from './BasicTable';
import { SmallP } from './styles';

export default function CompanyIndexText() {
  return (
    <>
      <NormalBoldText style={{ margin: '0px' }}>회사지수</NormalBoldText>
      <NormalRegularText style={{ fontSize: '18px' }}>
        {'보험금 지급과 관련해'}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 보험회사의 신뢰도를 '}
        </NormalBoldSpan>
        {'알려주는 지수에요.'}
      </NormalRegularText>
      <BasicTable />
      <br />
      <SmallP>지급여력비율: 2020.12 (4분기) 기준</SmallP>
      <SmallP>민원청구:2021.12 (4분기) 기준</SmallP>
      <SmallP>부지급률:2021 상반기 기준</SmallP>
      <SmallP>평균지급기간:2021 상반기 기준</SmallP>
      <SmallP>평균지연기간:2021 상반기 기준</SmallP>
      <SmallP>지급지연율:2021 상반기 기준</SmallP>
      <SmallP>부채비율:2021.9 공시 기준</SmallP>
      <SmallP>순자산:2021.9 공시 기준</SmallP>
    </>
  );
}
