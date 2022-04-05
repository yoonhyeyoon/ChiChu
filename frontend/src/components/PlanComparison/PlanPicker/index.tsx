// import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Box, Button, Grid } from '@mui/material';

import PlanComparison from '../../../pages/PlanComparison';
import PlanPickerFilled from '../PlanPickerFilled';
import PlanPickerUnfilled from '../PlanPickerUnfilled';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import useScrollDialog from '../../../hooks/useScrollDialog';
import { checkedPlanListState } from '../../../recoil/planComparisonState';
import { UserAge } from '../../../recoil/UserAge';
import { UserGender } from '../../../recoil/UserGender';
import { PlanPickerType } from '../../../types/types';
import { blue } from '../../../styles/Colors';

const maxNum = 3;

const getCodes = (list: PlanPickerType[]) => {
  let codes = '';
  list.forEach(item => {
    codes += item.product_code;
  });
  return codes;
};

function PlanPicker() {
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);
  const checkedPlanList = useRecoilValue(checkedPlanListState);

  const { resetPlanList } = useCheckBoxLinked();
  const { handleClickOpen, ScrollDialog } = useScrollDialog();
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
      <Box
        sx={{
          padding: 2,
          background: `linear-gradient(${blue[200]}, transparent)`,
          borderRadius: '15px',
        }}
      >
        <Button
          onClick={() => {
            deselectAndResetPlanList(checkedPlanList);
          }}
          variant="contained"
          color="secondary"
          sx={{ marginBottom: 2 }}
        >
          목록 초기화
        </Button>
        <Grid container spacing={2}>
          {/* 채워진 경우의 셀들 */}
          <PlanPickerFilled list={checkedPlanList} />
          {/* 채워지지 않은 경우의 셀들 */}
          <PlanPickerUnfilled maxNum={maxNum} curNum={checkedPlanList.length} />
        </Grid>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          disabled={checkedPlanList.length === 1}
        >
          원스톱 보험비교
          {/* <Link
          to="/compare"
          state={{
            age: userAge,
            gender: userGender,
            codes: getCodes(checkedPlanList),
          }}
          onClick={() => {
            deselectAndResetPlanList(checkedPlanList);
          }}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          원스톱 보험비교
        </Link> */}
        </Button>
      </Box>
      <ScrollDialog>
        <PlanComparison
          age={userAge as number}
          gender={userGender as number}
          codes={getCodes(checkedPlanList)}
        />
      </ScrollDialog>
    </>
  );
}

export default PlanPicker;
