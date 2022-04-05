import { IconButton, Grid, Paper } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

import CompanyProfile from '../../PlanDetail/CompanyProfile';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { PlanPickerType } from '../../../types/types';

function PlanPickerFilled({ list }: { list: PlanPickerType[] }) {
  const { removePlan } = useCheckBoxLinked();

  return (
    <>
      {list.map(item => (
        <Grid item sm={12} md={4} key={item.product_code}>
          <Paper elevation={3}>
            <CompanyProfile
              company_name={item.company_name}
              product_name={item.product_name}
            />
          </Paper>
          {/* 누르면 비교 목록에서 삭제 */}
          <IconButton
            onClick={() => {
              if (item.setChecked) {
                item.setChecked(false);
                removePlan(item.product_code);
              }
            }}
          >
            <HighlightOff />
          </IconButton>
        </Grid>
      ))}
    </>
  );
}

export default PlanPickerFilled;
