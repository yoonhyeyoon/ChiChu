import { TableCell } from '@mui/material';

import TableCellNoUnderline from '../TableCellNoUnderline';
import { range } from '../../../utils/arrayFunctions';

function TableBlankCells({
  num,
  isNotUnderlined,
}: {
  num: number;
  isNotUnderlined?: boolean;
}) {
  return (
    <>
      {range(num).map(() =>
        isNotUnderlined ? (
          <TableCellNoUnderline></TableCellNoUnderline>
        ) : (
          <TableCell></TableCell>
        ),
      )}
    </>
  );
}

export default TableBlankCells;
