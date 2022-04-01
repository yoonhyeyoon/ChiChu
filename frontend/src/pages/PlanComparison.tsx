import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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
import { planComparisonInfoState } from '../recoil/planComparisonState';

type inputType = {
  age: number;
  gender: number;
  codes: string;
};

function PlanComparison() {
  const location = useLocation();
  const input = location.state as inputType;
  const info = useRecoilValue(planComparisonInfoState({ ...input }));

  return (
    <>
      {info && (
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableHeader companies={info.company} />
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
              {['치아보철치료', '치아보전치료', '치수치료'].map(
                optionGroupName => (
                  <TableRowGroup
                    options={info[optionGroupName]}
                    key={optionGroupName}
                  />
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default PlanComparison;
