import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button, Grid, Paper, Typography } from '@mui/material';

import CompanyProfile from '../../PlanDetail/CompanyProfile';
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

function PlanPicker({ list }: { list: PlanPickerType[] }) {
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);

  return (
    <>
      <Grid container spacing={2}>
        {list.map(item => (
          <Grid item sm={4} key={item.product_code}>
            <CompanyProfile
              company_name={item.company_name}
              product_name={item.product_name}
            />
          </Grid>
        ))}
        <RemainingPlans maxNum={maxNum} list={list} />
      </Grid>
      <Button>
        <Link to={`/compare/${userAge}/${userGender}/${getCodes(list)}`}>
          원스톱 보험비교
        </Link>
      </Button>
    </>
  );
}

export default PlanPicker;
