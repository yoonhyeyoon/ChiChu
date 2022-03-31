import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  company_name: string,
  company_index: number,
  non_payment_rate: number,
  complaints: number,
  payment_period: number,
  delay_period: number,
  delay_rate: number,
  capital_ratio: number,
  debt_ratio: number,
  net_assets: number,
) {
  return {
    company_name,
    company_index,
    non_payment_rate,
    complaints,
    payment_period,
    delay_period,
    delay_rate,
    capital_ratio,
    debt_ratio,
    net_assets,
  };
}

const rows = [
  createData(
    '교보라이프플래닛',
    86.54,
    0.38,
    1.84,
    0.85,
    6.2,
    0,
    353.24,
    733.9619238,
    94,
  ),
  createData(
    '교보생명',
    73.02,
    0.38,
    1.84,
    0.85,
    6.2,
    0,
    353.24,
    733.9619238,
    94,
  ),
  createData(
    '라이나생명',
    73.97,
    0.46,
    3.44,
    1.05,
    8.3,
    10.31,
    336.04,
    2081.629534,
    1966,
  ),
  createData(
    '미래에셋생명',
    67.37,
    0.89,
    3.38,
    1.27,
    5.74,
    36.49,
    300.92,
    802.8936469,
    1917,
  ),
  createData(
    '삼성생명',
    78.2,
    1.06,
    5.86,
    1.66,
    5.9,
    19.84,
    263.95,
    508.7299728,
    33866,
  ),
  createData(
    '삼성화재',
    65.27,
    1.67,
    7.78,
    0.68,
    13.36,
    16.85,
    300.9,
    508.7299728,
    15319,
  ),
  createData(
    '에이스손해보험',
    66.87,
    1.26,
    2.97,
    2.03,
    9.65,
    10.7,
    264,
    376.0449928,
    194,
  ),
  createData(
    'ABL 인터넷보험',
    59.98,
    0.61,
    3.61,
    2.18,
    5.66,
    46.39,
    211.6,
    1623.89854,
    8799,
  ),
  createData(
    'DB손해보험',
    56.4,
    1.46,
    9.87,
    1.02,
    12.93,
    20.5,
    207.54,
    709.5643733,
    6139,
  ),
  createData(
    'KB손해보험',
    52.37,
    1.7,
    8.54,
    0.94,
    12.89,
    26.77,
    175.8,
    1110.273025,
    3282,
  ),
];

export default function BasicTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '1000px',
        height: '300px',
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>보험사명</TableCell>
            <TableCell align="right">회사지수</TableCell>
            <TableCell align="right">부지급률(%)</TableCell>
            <TableCell
              align="right"
              sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
            >
              민원청구(건, 10만건당)
              <br />
              환산건수 당분기
            </TableCell>
            <TableCell align="right">평균지급기간(일)</TableCell>
            <TableCell align="right">평균지급지연(일)</TableCell>
            <TableCell align="right">지급지연율(%) 금액</TableCell>
            <TableCell align="right">지급여력비율(%)</TableCell>
            <TableCell align="right">부채비율(%)</TableCell>
            <TableCell align="right">순자산(십억원)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            minWidth: 800,
            width: '1000px',
            overflowX: 'auto',
            overflowY: 'auto',
            border: '0',
            cellspacing: '0',
            cellpadding: '0',
          }}
        >
          {rows.map(row => (
            <TableRow
              key={row.company_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.company_name}
              </TableCell>
              <TableCell align="right">{row.company_index}</TableCell>
              <TableCell align="right">{row.non_payment_rate}</TableCell>
              <TableCell align="right">{row.complaints}</TableCell>
              <TableCell align="right">{row.payment_period}</TableCell>
              <TableCell align="right">{row.delay_period}</TableCell>
              <TableCell align="right">{row.delay_rate}</TableCell>
              <TableCell align="right">{row.capital_ratio}</TableCell>
              <TableCell align="right">{row.debt_ratio}</TableCell>
              <TableCell align="right">{row.net_assets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
