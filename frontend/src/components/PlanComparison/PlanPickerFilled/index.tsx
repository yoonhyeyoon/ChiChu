import { Button, Grid } from '@mui/material';

import CompanyProfile from '../../PlanDetail/CompanyProfile';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { PlanPickerType } from '../../../types/types';

function PlanPickerFilled({ list }: { list: PlanPickerType[] }) {
  const { removePlan } = useCheckBoxLinked();

  return (
    <>
      {list.map(item => (
        <Grid item sm={12} md={4} key={item.product_code}>
          <CompanyProfile
            company_name={item.company_name}
            product_name={item.product_name}
          />
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
        </Grid>
      ))}
    </>
  );
}

export default PlanPickerFilled;
