import * as React from 'react';
import { DD_RIGHT, DD_LEFT } from './styles';

type PropType = {
  option: {
    OPTION_NAME: string;
    'SUM(COVERAGE)': number;
  }[];
};

export function OptionDetailBoard(props: PropType) {
  return (
    <div>
      {/* <dl>
        <dt>치아보철치료</dt>
        <dd>
          <DD_LEFT>임플란트</DD_LEFT>
          <DD_RIGHT>{option.}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>틀니</DD_LEFT>
          <DD_RIGHT>{option.}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>브릿지</DD_LEFT>
          <DD_RIGHT>{option.}</DD_RIGHT>
        </dd>
      </dl> */}
      <dl>
        <dt>치아보존치료</dt>
        <dd>
          <DD_LEFT>크라운</DD_LEFT>
          <DD_RIGHT>{props.option[2]['SUM(COVERAGE)']}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>아말감</DD_LEFT>
          <DD_RIGHT>{props.option[1]['SUM(COVERAGE)']}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>복합레진</DD_LEFT>
          <DD_RIGHT>{props.option[0]['SUM(COVERAGE)']}</DD_RIGHT>
        </dd>
      </dl>
      {/* <dl>
        <dt>치수치료</dt>
        <dd>
          <DD_LEFT>치수치료</DD_LEFT>
          <DD_RIGHT>{option.}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>기타</dt>
        <dd>
          <DD_LEFT>잇몸질환</DD_LEFT>
          <DD_RIGHT>{option.}</DD_RIGHT>
        </dd>
      </dl> */}
    </div>
  );
}
