import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import TableRowGroup from '../components/PlanComparison/TableRowGroup';
import sampleList from '../components/PlanComparison/sampleList.json';
import { ComparisonTableType } from '../types/types';

const sample: ComparisonTableType = sampleList;

function PlanComparison() {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">VS</TableCell>
            <TableCell align="center">[교] 교보생명, 튼튼치아</TableCell>
            <TableCell align="center">[삼] 삼성생명, 건강치아</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>치츄지수 (?)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>수직 그래프</TableCell>
            <TableCell>수직 그래프</TableCell>
          </TableRow>
          {/* 각 담보 그룹들을 출력 */}
          {Object.keys(sample).map(optionGroupName => (
            <TableRowGroup
              options={sample[optionGroupName]}
              key={optionGroupName}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlanComparison;
