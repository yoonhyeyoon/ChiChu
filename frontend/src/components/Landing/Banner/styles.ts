import styled, { keyframes } from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export const Background = styled.img`
  width: 100%;
  height: 100vh;
  // background-image: url('/images/background.png');
  // background-size: cover;
  z-index: 0;
  position: absolute;
`;

export const ChiChu = styled.img`
  z-index: 2;
  position: absolute;
  width: 50%;
  right: 8%;
`;

const float = keyframes`
    0% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
      transform: translate(0,  0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
      transform: translate(0, -20px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
      transform: translate(0, 0px);
    }
`;

export const ChiChuAnimation = styled.div`
  // z-index: 2;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translate(0px);
  // position: absolute;
  animation: ${float} 3s ease-in-out infinite;
`;

export const ContentDiv = styled.div`
  position: absolute;
  top: 30%;
`;

export const Content = styled.h1`
  font-size: 5rem;
  color: #fff;
`;
