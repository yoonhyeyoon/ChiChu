import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button, Grid } from '@mui/material';

import PlanPickerFilled from '../PlanPickerFilled';
import PlanPickerUnfilled from '../PlanPickerUnfilled';
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

  const { resetPlanList } = useCheckBoxLinked();
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
        {/* 채워진 경우의 셀들 */}
        <PlanPickerFilled list={list} />
        {/* 채워지지 않은 경우의 셀들 */}
        <PlanPickerUnfilled maxNum={maxNum} curNum={list.length} />
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

export default PlanPicker;
