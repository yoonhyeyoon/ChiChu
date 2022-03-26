import React from 'react';
import { DD_RIGHT, DD_LEFT } from './styles';

type PropType = {
  sample: {
    product_code: string;
    product_name: string;
    brand_name: string;
    company_index: number;
    product_index: number;
    user_index: number;
    total_index: number;
    company_index_mean: number;
    plan_cost: string;
    option: {
      보철치료: {
        임플란트?: number;
        브릿지?: number;
        틀니?: number;
      };
      보존치료: {
        크라운?: number;
        아말감?: number;
        복합레진?: number;
      };
      신경치료: {
        치수치료: number;
      };
      기타: {
        잇몸질환?: number;
        치조골_이식수술?: number;
        스케일링?: number;
        치아골절_진단비?: number;
        X_RAY_촬영?: number;
      };
    };
  };
};

export function OptionBoard({ sample }: PropType) {
  return (
    <div>
      <dl>
        <dt>치아보철치료</dt>
        <dd>
          <DD_LEFT>임플란트</DD_LEFT>
          <DD_RIGHT>{sample.option.보철치료.임플란트}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>틀니</DD_LEFT>
          <DD_RIGHT>{sample.option.보철치료.틀니}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>브릿지</DD_LEFT>
          <DD_RIGHT>{sample.option.보철치료.브릿지}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>치아보존치료</dt>
        <dd>
          <DD_LEFT>크라운</DD_LEFT>
          <DD_RIGHT>{sample.option.보존치료.크라운}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>아말감</DD_LEFT>
          <DD_RIGHT>{sample.option.보존치료.아말감}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>복합레진</DD_LEFT>
          <DD_RIGHT>{sample.option.보존치료.복합레진}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>치수치료</dt>
        <dd>
          <DD_LEFT>치수치료</DD_LEFT>
          <DD_RIGHT>{sample.option.신경치료.치수치료}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>기타</dt>
        <dd>
          <DD_LEFT>잇몸질환</DD_LEFT>
          <DD_RIGHT>{sample.option.기타.잇몸질환}</DD_RIGHT>
        </dd>
      </dl>
    </div>
  );
}
