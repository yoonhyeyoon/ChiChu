import { Stack } from '@mui/material';

import { PlanPreviewType } from '../../../types/types';
import PlanBar from '../PlanBar';

function PlanBarList({ list }: { list: PlanPreviewType[] }): JSX.Element {
  return (
    <Stack direction="column" spacing={2}>
      {list.map(content => (
        <PlanBar
          logo_img={content.logo_img}
          brand_name={content.brand_name}
          plan_name={content.plan_name}
          plan_type={content.plan_type}
          plan_cost={content.plan_cost}
          plan_score={content.plan_score}
        />
      ))}
    </Stack>
  );
}

export default PlanBarList;
