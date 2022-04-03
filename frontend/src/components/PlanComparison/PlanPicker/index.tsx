import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button, Checkbox, Grid, Paper, Typography } from '@mui/material';

import CompanyProfile from '../../PlanDetail/CompanyProfile';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { UserAge } from '../../../recoil/UserAge';
import { UserGender } from '../../../recoil/UserGender';
import { PlanPickerType } from '../../../types/types';

const maxNum = 3;

const getCodes = (list: PlanPickerType[]) => {
  let codes = '';
  list.forEach(item => {
    codes += item.product_code;
  });
  return codes;
};

function PlanPicker({ list }: { list: PlanPickerType[] }) {
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);

  const { removePlan, resetPlanList } = useCheckBoxLinked();
  const deselectAndResetPlanList = (list: PlanPickerType[]) => {
    list.forEach(item => {
      if (item.setChecked) {
        item.setChecked(false);
      }
    });
    resetPlanList();
  };

  return (
    <>
      <Button
        onClick={() => {
          deselectAndResetPlanList(list);
        }}
      >
        목록 초기화
      </Button>
      <Grid container spacing={2}>
        {list.map(item => (
          <Grid item sm={4} key={item.product_code}>
            {/* 누르면 비교 목록에서 삭제 */}
            <Button
              onClick={() => {
                if (item.setChecked) {
                  item.setChecked(false);
                  removePlan(item.product_code);
                }
              }}
            >
              X
            </Button>
            <CompanyProfile
              company_name={item.company_name}
              product_name={item.product_name}
            />
          </Grid>
        ))}
        <RemainingPlans maxNum={maxNum} list={list} />
      </Grid>
      <Button variant="contained" disabled={list.length === 1}>
        <Link
          to="/compare"
          state={{ age: userAge, gender: userGender, codes: getCodes(list) }}
          onClick={() => {
            deselectAndResetPlanList(list);
          }}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          원스톱 보험비교
        </Link>
      </Button>
    </>
  );
}

function RemainingPlans<T>({
  maxNum,
  list,
}: {
  maxNum: number;
  list: Array<T>;
}) {
  return (
    <>
      {Array.from(Array(maxNum - list.length).keys()).map(value => (
        <Paper key={value}>
          <Typography color="GrayText">
            상품은 2~3개까지 <br />
            비교 가능합니다.
          </Typography>
        </Paper>
      ))}
    </>
  );
}

export default PlanPicker;
