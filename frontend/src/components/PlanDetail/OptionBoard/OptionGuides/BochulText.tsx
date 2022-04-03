import React from 'react';
import { TextBoard, Image } from './styles';

export function BochulText() {
  return (
    <TextBoard>
      <h2>치아보철치료</h2>
      <Image src="/images/plandetail/modal/bochul1.png" alt="보철치료설명" />
      <h3>보철치료란?</h3>
      <p>
        임플란트, 브릿지, 틀니 치료를 포괄하는 것으로, 이를 한 개 이상 빼고,
        빠진 치아를 대신할 인공 치아를 박아 치아의 기능을 회복시키는 치료에요.
        40대 이상부터 인공치아를 많이 찾기 때문에 나이대에 맞춰 '치아 보철치료'
        보장금액을 꼭 확인해주세요.
      </p>
      <br />
      <h3>치아보철 치료 종류</h3>
      <Image
        src="/images/plandetail/modal/bochul2.png"
        alt="임플란트.브릿지.틀니 설명"
      />
      <strong>1. 임플란트란?</strong>
      <p>
        임플란트는 충치나 잇몸병으로 없어진 치아나, 사고 또는 종양 등으로 인해
        뼈와 잇몸이 없는 부분에 대해서 철심을 박아 의치를 붙여 기능을 회복시키는
        치료에요.
      </p>
      <strong>2. 틀니란?</strong>
      <p>
        치아가 빠지거나 결손된 경우 잇몸에 끼워서 음식물을 씹을 수 있도록
        인공적으로 만든 틀 모양의 이를 말해요.
      </p>
      <strong>3. 브릿지란?</strong>
      <p>
        없어진 치아의 양 옆 치아를 적절하게 다듬어 지지대로 삼아 다리처럼 연결해
        기능을 회복시키는 치료에요.
      </p>
    </TextBoard>
  );
}
