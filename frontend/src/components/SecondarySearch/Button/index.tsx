import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserGender } from '../../../recoil/UserGender';
import { UserAge } from '../../../recoil/UserAge';
import { CustomButtonRoot } from '../../Common/CHICHUButton/styles';
import { PlanListSelector } from '../../../recoil/PlanListSelector';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function SecondaryButton() {
  const navigate = useNavigate();
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);
  console.log(userAge, userGender);
  // const planListSelector = useResetRecoilState(PlanListSelector);
  const handleClick = () => {
    // planListSelector();
    navigate('', { replace: false });
    // navigate.
    // location.href = 'http://localhost:3000/search/result';
  };
  return (
    <Stack spacing={2} direction="row">
      <CustomButton
        disabled={userAge && userGender != null ? false : true}
        onClick={handleClick}
      >
        확인
      </CustomButton>
    </Stack>
  );
}

export default SecondaryButton;
