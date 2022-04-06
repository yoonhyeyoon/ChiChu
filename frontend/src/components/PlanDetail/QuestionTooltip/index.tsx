import * as React from 'react';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(51, 153, 255, 1)',
    color: 'white',
    maxWidth: 260,
    fontSize: theme.typography.pxToRem(12),
    fontFamily: 'NotoSansKRRegular',
    border: '1px solid #dadde9',
  },
}));

export default function QuestionTooltip() {
  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit" fontSize={16}>
              <b>치츄지수란?</b>
            </Typography>
            {
              <span
                style={{ fontFamily: 'NotoSansKRRegular', fontSize: '14px' }}
              >
                상품지수, 회사지수, 유저지수를 종합한 값입니다.&nbsp;
              </span>
            }
            {
              <span style={{ fontFamily: 'NotoSansKRLight', fontSize: '14px' }}>
                <b style={{ fontFamily: 'NotoSansKRRegular' }}>
                  회사지수를&nbsp;{'2'}
                </b>
                ,&nbsp;
                <b style={{ fontFamily: 'NotoSansKRRegular' }}>
                  상품지수를&nbsp;{'3'}
                </b>
                ,&nbsp;
                <b style={{ fontFamily: 'NotoSansKRRegular' }}>
                  유저지수를&nbsp; {'1'}
                </b>
                로 가중치를 둬서 산정한 지수입니다.
              </span>
            }
          </React.Fragment>
        }
      >
        <HelpOutlineIcon
          fontSize="small"
          color="primary"
          sx={{ cursor: 'pointer', marginLeft: '2px', marginBottom: '8px' }}
        />
      </HtmlTooltip>
    </>
  );
}
