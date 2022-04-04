import { Grid, Paper } from '@mui/material';
import CompanyProfile from '../../PlanDetail/CompanyProfile';

function PlanPickerUnfilled({
  maxNum,
  curNum,
}: {
  maxNum: number;
  curNum: number;
}) {
  return (
    <>
      {Array.from(Array(maxNum - curNum).keys()).map(value => (
        <Grid item sm={12} md={4} key={value}>
          <Paper>
            <CompanyProfile
              company_name={''}
              product_name={'상품은 2 ~ 3개까지 비교 가능합니다.'}
            />
          </Paper>
        </Grid>
      ))}
    </>
  );
}

export default PlanPickerUnfilled;
