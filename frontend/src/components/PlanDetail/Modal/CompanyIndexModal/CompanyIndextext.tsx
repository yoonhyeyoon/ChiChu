import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalBoldSpan,
  NormalLightSpan,
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
      <NormalRegularText style={{ fontSize: '18px', marginTop: '0px' }}>
        {'보험 상품을 선택할 때'}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 어떤 보험사에서 제공하는 상품인지 '}
        </NormalBoldSpan>
        {'확인하는 것도 중요합니다.'}
        <br />
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 보험금의 지급이 잘 이루어 지는지, 회사의 부채는 어느 정도인지 '}
        </NormalBoldSpan>
        {'등을 고려하여 보험사를 선택하는 것이 좋습니다.'}
      </NormalRegularText>
      <br />
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        지급여력비율: 2020.12 (4분기) 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        민원청구:2021.12 (4분기) 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        부지급률:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        평균지급기간:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        평균지연기간:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        지급지연율:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <br />
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        부채비율:2021.9 공시 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        순자산:2021.9 공시 기준
      </NormalLightSpan>
    </>
  );
}
