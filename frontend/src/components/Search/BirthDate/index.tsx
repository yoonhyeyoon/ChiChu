import React, { useState } from 'react';
import useInput from '../../../hooks/useInput';
import { StyledInput } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';

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
  const [birthDate, setBirthDate] = useState('');
  const [birthDateMessage, setBirthDateMessage] = useState('');
  const [insuranceDate, setInsuranceDate] = useState('');

  const [open, setOpen] = React.useState(false);

  // 보험나이계산
  const calculateInsuranceDate = (birthDateCrt: string) => {
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
    setInsuranceDate('(보험나이 만' + String(age) + '세)');
    console.log(insuranceDate);
  };

  const onChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDateRegex =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const birthDateCrt = e.target.value;
    setBirthDate(birthDateCrt);

    if (!birthDateRegex.test(birthDateCrt)) {
      setBirthDateMessage('19970405 형식으로 입력해주세요!');
      setInsuranceDate('');
    } else {
      setBirthDateMessage('');
      calculateInsuranceDate(birthDateCrt);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <StyledInput
        placeholder="출생연월(Ex. 19970405)"
        value={birthDate}
        onChange={onChangeBirthDate}
      />
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <HtmlTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          title={
            <React.Fragment>
              <Typography color="inherit">보험나이란?</Typography>
              <b>{'보험나이'}</b>
              {'는 주민등록상 생일을 기준으로 '}
              <b>{'6개월'}</b>
              {' 되는 날 부터 한 살 더 올라갑니다.'}
              {'보험나이에 따라 사망, 사고등의 위험률이 변경되어 '}
              <b>{'보험료도 변경'}</b>
              {'될 수 있습니다.'}
            </React.Fragment>
          }
        >
          <HelpOutlineIcon color="primary" onClick={handleTooltipOpen} />
        </HtmlTooltip>
      </ClickAwayListener>
      {birthDateMessage}
      {insuranceDate}
    </>
  );
}

export default BirthDate;
