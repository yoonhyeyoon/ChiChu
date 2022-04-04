/**
 * 참/거짓 값에 따라
 * 컴포넌트를 보여주거나 숨기는 애니메이션 효과
 * 기준이 되는 창은 ref prop을 통해 알려줘야 함
 * 참고: https://mui.com/components/transitions/
 */

import * as React from 'react';
import { Box, Slide } from '@mui/material';

type TransitionType = {
  component: JSX.Element;
  checked: boolean;
  containerRef: React.MutableRefObject<null>;
};

function Transition({ component, checked, containerRef }: TransitionType) {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '200px',
        left: '100px',
        zIndex: 1,
        textAlign: 'center',
      }}
    >
      <Slide direction="up" in={checked} container={containerRef.current}>
        {/* 내용물이 비어있으면 완전히 사라지는 것처럼 보임. 
            옆에 aaa 같은 더미를 붙이면 사라지는 게 제대로 보임 */}
        <Box>{component}</Box>
      </Slide>
    </Box>
  );
}

export default Transition;