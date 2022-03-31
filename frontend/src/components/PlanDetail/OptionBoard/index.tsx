import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LongModal from '../Modal/LongModal';
import { BochulText } from './OptionGuides/BochulText';
import { DD_RIGHT, DD_LEFT } from './styles';
import { BozonText } from './OptionGuides/BozonText';
import { SingyeongText } from './OptionGuides/SingyeongText';
import { ETC } from './OptionGuides/ETC';

type PropType = {
  option: {
    NAME: string;
    COVERAGE: string;
  }[];
};

export function OptionBoard(props: PropType) {
  let implant = '';
  let teulni = '';
  let bridge = '';

  let legin = '';
  let crown = '';
  let amalgam = '';

  let singyeong = '';

  let itmom = '';
  let chizogol = '';
  let scaling = '';
  let goljeol = '';
  let x_ray = '';

  for (const item of props.option) {
    if (item['NAME'] == '레진') {
      legin = item['COVERAGE'];
    } else if (item['NAME'] == '크라운') {
      crown = item['COVERAGE'];
    } else if (item['NAME'] == '아말감') {
      amalgam = item['COVERAGE'];
    } else if (item['NAME'] == '임플란트') {
      implant = item['COVERAGE'];
    } else if (item['NAME'] == '틀니') {
      teulni = item['COVERAGE'];
    } else if (item['NAME'] == '브릿지') {
      bridge = item['COVERAGE'];
    } else if (item['NAME'] == '신경치료') {
      singyeong = item['COVERAGE'];
    } else if (item['NAME'] == '잇몸질환') {
      itmom = item['COVERAGE'];
    } else if (item['NAME'] == '치조골 이식수술') {
      chizogol = item['COVERAGE'];
    } else if (item['NAME'] == '스케일링') {
      scaling = item['COVERAGE'];
    } else if (item['NAME'] == '치아골절 진단비') {
      goljeol = item['COVERAGE'];
    } else if (item['NAME'] == 'X-RAY 촬영') {
      x_ray = item['COVERAGE'];
    }
  }

  return (
    <div>
      <dl>
        <dt>치아보철치료</dt>
        <LongModal
          element={<BochulText />}
          icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
        />
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
        <LongModal
          element={<BozonText />}
          icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
        />
        <dd>
          <DD_LEFT>크라운</DD_LEFT>
          <DD_RIGHT>{crown ? crown : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>아말감</DD_LEFT>
          <DD_RIGHT>{amalgam ? amalgam : '0원'}</DD_RIGHT>
        </dd>
        <dd>
          <DD_LEFT>레진</DD_LEFT>
          <DD_RIGHT>{legin ? legin : '0원'}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>신경치료</dt>
        <LongModal
          element={<SingyeongText />}
          icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
        />
        <dd>
          <DD_LEFT>신경치료</DD_LEFT>
          <DD_RIGHT>{singyeong ? singyeong : '0원'}</DD_RIGHT>
        </dd>
      </dl>
      <dl>
        <dt>기타</dt>
        <LongModal
          element={<ETC />}
          icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
        />
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
