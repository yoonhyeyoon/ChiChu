import React from 'react';
import {
  Background,
  ChiChu,
  ChiChuAnimation,
  Content,
  ContentDiv,
} from './styles';

function Banner() {
  return (
    <div>
      <Background src="/images/background.png" />
      <ChiChuAnimation>
        <ChiChu src="/images/why.png" alt="" />
      </ChiChuAnimation>
      <ContentDiv>
        <Content>CHICHU</Content>
      </ContentDiv>
    </div>
  );
}

export default Banner;
