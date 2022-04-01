import React from 'react';
import { DD_RIGHT, DD_LEFT } from './styles';

type PropType = {
  option_detail: {
    NAME: string;
    COVERAGE: number;
  }[];
};

export function OptionDetailBoard(props: PropType) {
  console.log(props.option_detail);
  return (
    <div>
      {props.option_detail.map(item => {
        return (
          <div>
            <DD_LEFT>{item['NAME']}</DD_LEFT>
            <DD_RIGHT>{item['COVERAGE'].toLocaleString()}원</DD_RIGHT>
          </div>
        );
      })}
    </div>
  );
}
