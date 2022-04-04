import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  Paper,
} from '@mui/material';

import { BochulText } from '../components/PlanDetail/Option/OptionBoard/OptionGuides/BochulText';
import { BozonText } from '../components/PlanDetail/Option/OptionBoard/OptionGuides/BozonText';
import { SingyeongText } from '../components/PlanDetail/Option/OptionBoard/OptionGuides/SingyeongText';
import TableHeader from '../components/PlanComparison/TableHeader';
import TableRowBarPlot from '../components/PlanComparison/TableRowBarPlot';
import TableRowGroup from '../components/PlanComparison/TableRowGroup';
import { planComparisonInfoState } from '../recoil/planComparisonState';

type inputType = {
  age: number;
  gender: number;
  codes: string;
};

const optionGroups = [
  {
    name: '치아보철치료',
    helpContent: <BochulText />,
  },
  {
    name: '치아보존치료',
    helpContent: <BozonText />,
  },
  {
    name: '치수치료',
    helpContent: <SingyeongText />,
  },
];

function PlanComparison() {
  const location = useLocation();
  const input = location.state as inputType;
  const info = useRecoilValue(planComparisonInfoState({ ...input }));

  return (
    <>
      <Typography textAlign="center" variant="h5" fontFamily="NotoSansKRBold">
        치아보험 비교하기
        <h5>
          ({input.gender === 1 ? '남성' : '여성'} {input.age}세 기준)
        </h5>
      </Typography>

      {info && (
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            {/* 회사 & 상품 프로필 */}
            <TableHead>
              <TableHeader companies={info.company} />
            </TableHead>
            <TableBody>
              {/* 치츄 지수 그래프 */}
              <TableRowBarPlot list={info['치츄지수']} />

              {/* 각 담보 그룹들을 출력 */}
              {optionGroups.map(optionGroup => (
                <TableRowGroup
                  optionGroupName={optionGroup.name}
                  options={info[optionGroup.name]}
                  helpContent={optionGroup.helpContent}
                  key={optionGroup.name}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default PlanComparison;
