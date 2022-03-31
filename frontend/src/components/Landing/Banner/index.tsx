import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import {
  Background,
  ChiChu,
  ChiChuAnimation,
  Content,
  ContentDiv,
  CustomButtonRoot,
  Title,
} from './styles';
import { useNavigate } from 'react-router-dom';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function Banner() {
  const navigate = useNavigate();
  return (
    <div>
      <Background src="/images/randing/background.png" />
      <Container>
        <ChiChuAnimation>
          <ChiChu src="/images/randing/chichu.png" alt="" />
        </ChiChuAnimation>
        <ContentDiv>
          <Title>CHI CHU</Title>
          <Content>치아보험? 치츄가 찾아줄게요</Content>
          <Content>빅데이터 추천 서비스</Content>

          <CustomButton onClick={() => navigate('search')}>
            치츄 시작하기
          </CustomButton>
        </ContentDiv>
      </Container>
    </div>
  );
}

export default Banner;
