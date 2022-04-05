import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalLightText,
  NormalBoldSpan,
} from '../../../styles';
import { TextBoard } from './styles';

export function ETC() {
  return (
    <TextBoard>
      <NormalBoldText style={{ color: '#3e5060', marginTop: '0px' }}>
        기타 담보 설명
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          치아 보철, 보존, 치조골이식술
        </NormalBoldSpan>
        을 제외한 그 외의 치료들은 모두{' '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          건강보험이 적용되는 치료에요.
        </NormalBoldSpan>{' '}
        치료비는 보통 몇 만원 수준이기 때문에 기타 치료들의 치료비 경감을
        목적으로 치아보험을 가입한다면 중요성은 높지 않아요.
      </NormalRegularText>
      <br />
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        잇몸질환
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치주병이란 세균에 의해 발생되는 치아주위
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 잇몸의 염증이 생겨서 '}
        </NormalBoldSpan>
        잇몸뼈가 내려앉거나 심할 경우, 잇몸뼈가 파괴 되는 질환이에요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        치조골 이식수술
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'임플란트 치료와 항상 연계되는 치료로, '}
        </NormalBoldSpan>
        잇몸뼈가 없는 부위에 뼈를 이식하는 수술이에요.
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 건강보험이 적용되지 않아서 '}
        </NormalBoldSpan>
        진료비도 상당하기 때문에 임플란트의 보장조건과 같거나 비슷한 경우가
        많아요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        스케일링
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치아 표면에 붙어있는 침착물, 특히
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 치석을 긁어내는 행위'}
        </NormalBoldSpan>
        를 뜻해요. 현재
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 잇몸 질환 예방 목적의 스케일링'}
        </NormalBoldSpan>
        은 19세 이상의 성인의 경우
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 1년에 1회 의료 보험'}
        </NormalBoldSpan>
        으로 진행이 가능해요. 보통 스케일링으로 제거된 치석과 치태는 3개월
        정도면 원상복구 되므로
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 3개월에 한번 '}
        </NormalBoldSpan>
        정도는 치과에 방문하여 잇몸 검사를 받는 것이 좋아요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        치아골절 진단비
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치아가
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 깨지거나 부러진 경우 '}
        </NormalBoldSpan>
        진단비를 지급해요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        X-RAY 촬영
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치아 뿌리의 염증이나 신경의 문제, 잇몸 내부에 숨어 있는 매복니 등은 물론
        어린이들의 영구치가 다 존재하는지 알아보는 수단으로도
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 치아 엑스레이는 '}
        </NormalBoldSpan>
        중요한 역할을 해요.
      </NormalRegularText>
    </TextBoard>
  );
}
