import * as React from 'react';
import { DD_RIGHT, DD_LEFT } from './styles';

type PropType = {
  option: {
    OPTION_NAME: string;
    'SUM(COVERAGE)': number;
  }[];
};

export function OptionBoard(props: PropType) {
  console.log(props.option);
  console.log(typeof props.option);
  let implant = 0;
  let teulni = 0;
  let bridge = 0;

  let legin = 0;
  let crown = 0;
  let amalgam = 0;

  let singyeong = 0;

  let itmom = 0;
  let chizogol = 0;
  let scaling = 0;
  let goljeol = 0;
  let x_ray = 0;

  for (const item of props.option) {
    if (item['OPTION_NAME'] == '레진') {
      legin = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '크라운') {
      crown = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '아말감') {
      amalgam = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '임플란트') {
      implant = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '틀니') {
      teulni = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '브릿지') {
      bridge = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '신경치료') {
      singyeong = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '잇몸질환') {
      itmom = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '치조골 이식수술') {
      chizogol = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '스케일링') {
      scaling = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == '치아골절 진단비') {
      goljeol = item['SUM(COVERAGE)'];
    } else if (item['OPTION_NAME'] == 'X-RAY 촬영') {
      x_ray = item['SUM(COVERAGE)'];
    }
  }

  return (
    <div>
      <dl>
        <dt>치아보철치료</dt>
        <dd>
          <DD_LEFT>임플란트</DD_LEFT>
          <DD_RIGHT>{implant ? implant : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>틀니</DD_LEFT>
          <DD_RIGHT>{teulni ? teulni : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>브릿지</DD_LEFT>
          <DD_RIGHT>{bridge ? bridge : '0원'}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>치아보존치료</dt>
        <dd>
          <DD_LEFT>크라운</DD_LEFT>
          <DD_RIGHT>{crown ? crown : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>아말감</DD_LEFT>
          <DD_RIGHT>{amalgam ? amalgam : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>복합레진</DD_LEFT>
          <DD_RIGHT>{legin ? legin : '0원'}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>신경치료</dt>
        <dd>
          <DD_LEFT>신경치료</DD_LEFT>
          <DD_RIGHT>{singyeong ? singyeong : '0원'}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>기타</dt>
        <dd>
          <DD_LEFT>잇몸질환</DD_LEFT>
          <DD_RIGHT>{itmom ? itmom : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>치조골 이식수술</DD_LEFT>
          <DD_RIGHT>{chizogol ? chizogol : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>스케일링</DD_LEFT>
          <DD_RIGHT>{scaling ? scaling : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>치아골절 진단비</DD_LEFT>
          <DD_RIGHT>{goljeol ? goljeol : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>X-RAY 촬영</DD_LEFT>
          <DD_RIGHT>{x_ray ? x_ray : '0원'}</DD_RIGHT>
        </dd>
      </dl>
    </div>
  );
}
