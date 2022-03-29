import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import TableHeader from '../components/PlanComparison/TableHeader';
import TableRowGroup from '../components/PlanComparison/TableRowGroup';
import {
  ComparisonTableType,
  ComparisonTableCompanyType,
} from '../types/types';
import sampleList from '../components/PlanComparison/sampleList.json';
import sampleCompany from '../components/PlanComparison/sampleCompany.json';

const sample: ComparisonTableType = sampleList;
const companies: ComparisonTableCompanyType[] = sampleCompany.company;

function PlanComparison() {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeader companies={companies} />
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
