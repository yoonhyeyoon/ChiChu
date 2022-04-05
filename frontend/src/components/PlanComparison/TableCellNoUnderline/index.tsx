import { TableCell, TableCellProps } from '@mui/material';

function TableCellNoUnderline(props: TableCellProps) {
  return (
    <TableCell {...props} sx={{ borderBottomWidth: 0 }}>
      {props.children}
    </TableCell>
  );
}

export default TableCellNoUnderline;
