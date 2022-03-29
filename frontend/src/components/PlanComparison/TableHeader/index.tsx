/**
 * 각 회사들의 프로필 행.
 * 상세검색의 회사 프로필을 이용
 * */

import { TableCell, TableRow } from '@mui/material';

import CompanyProfile from '../../PlanDetail/CompanyProfile';
import { ComparisonTableCompanyType } from '../../../types/types';
type TableHeaderType = {
  companies: ComparisonTableCompanyType[];
};

function TableHeader({ companies }: TableHeaderType) {
  return (
    <TableRow>
      <TableCell></TableCell>
      {companies.map(company => (
        <TableCell align="center" key={company.product_code}>
          {/* 회사들 프로필 부분 */}
          <CompanyProfile
            company_name={company.company_name}
            product_name={company.product_code}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableHeader;
