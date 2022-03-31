import React from 'react';
import BasicTable from './BasicTable';
import { SmallP } from './styles';

export default function CompanyIndexText() {
  return (
    <>
      <h2>회사지수</h2>
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
