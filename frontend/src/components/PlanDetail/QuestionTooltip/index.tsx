import * as React from 'react';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
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

export default function QuestionTooltip() {
  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">치츄지수란?</Typography>
            {
              '상품지수, 회사지수, 유저지수 합친 값이다. 회사지수 2, 상품지수 3, 유저지수 1로 가중치를 둬서 산정한 지수입니다.'
            }
          </React.Fragment>
        }
      >
        <HelpOutlineIcon color="primary" sx={{ cursor: 'pointer' }} />
      </HtmlTooltip>
    </>
  );
}
