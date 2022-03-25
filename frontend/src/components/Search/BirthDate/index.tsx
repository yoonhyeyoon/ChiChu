import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserAge, UserBirthDate } from '../../../recoil/UserAge';
// import useInput from '../../../hooks/useInput';
import { InsuranceDate, StyledInput } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

function BirthDate() {
  const [birthDate, setBirthDate] = useRecoilState(UserBirthDate);

  const [birthDateMessage, setBirthDateMessage] = useState('');
  const [userAge, setUserAge] = useRecoilState(UserAge);
  const [isBirthDate, setIsBirthDate] = useState(false);

  const [open, setOpen] = React.useState(false);

  // 보험나이계산
  const calculateUserAge = (birthDateCrt: string) => {
    const year = Number(birthDateCrt.slice(0, 4));
    const month = Number(birthDateCrt.slice(4, 6));
    const day = Number(birthDateCrt.slice(6, 8));

    const today = new Date();
    const date = new Date(year, month - 7, day);
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    setUserAge(age);
  };

  const onChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDateRegex =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const birthDateCrt = e.target.value;
    setBirthDate(birthDateCrt);

    if (!birthDateRegex.test(birthDateCrt)) {
      setBirthDateMessage('19970405 형식으로 입력해주세요!');
      setIsBirthDate(false);
      setUserAge(null);
    } else {
      setBirthDateMessage('');

      calculateUserAge(birthDateCrt);
      setIsBirthDate(true);
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Box>
          <StyledInput
            placeholder="생년월일 (Ex. 19970405)"
            value={birthDate}
            onChange={onChangeBirthDate}
            maxLength={8}
          />
          {isBirthDate ? (
            <span>
              {'(보험나이 만 ' + userAge + '세)'}
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      <b>보험나이란?</b>
                    </Typography>
                    {'보험나이는 '}
                    <b>{'주민등록상 생일'}</b>
                    {'을 기준으로 '}
                    <b>{'6개월'}</b>
                    {' 되는 날 부터 한 살 더 올라갑니다.'}
                    {'보험나이에 따라 사망, 사고등의 위험률이 변경되어 '}
                    <b>{'보험료도 변경'}</b>
                    {'될 수 있습니다.'}
                  </React.Fragment>
                }
              >
                <HelpOutlineIcon color="primary" sx={{ cursor: 'pointer' }} />
              </HtmlTooltip>
            </span>
          ) : null}
        </Box>
        {birthDateMessage}
      </Stack>
    </>
  );
}

export default BirthDate;
