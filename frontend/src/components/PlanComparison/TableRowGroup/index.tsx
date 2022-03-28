import { TableCell, TableRow } from '@mui/material';

import { ComparisonTableRowType } from '../../../types/types';

function TableRowGroup({ options }: { options: ComparisonTableRowType[] }) {
  return (
    <>
      {/* 그룹 담보명 */}
      <TableRow>
        <TableCell>치아보존치료비 (?)</TableCell>
      </TableRow>
      {/* 세부 담보들 */}
      {options.map(option => (
        <TableRow key={option.option_name}>
          {/* 해당 담보명 */}
          <TableCell component="th" scope="row">
            {option.option_name}
          </TableCell>
          {/* 해당 담보에 대한 각 보험 상품들 보장 목록 */}
          {option.coverage.map((value, col) => (
            <TableCell align="center" key={col}>
              {value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default TableRowGroup;
