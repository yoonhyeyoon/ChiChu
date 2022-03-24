import { Grid } from '@mui/material';

import { PlanPreviewType } from '../../../types/types';
import Card from '../PlanCard';

function CardList({ list }: { list: PlanPreviewType[] }) {
  return (
    <Grid container spacing={2}>
      {list.map(content => (
        <Grid item xs={4}>
          <Card
            logo_img={content.logo_img}
            brand_name={content.brand_name}
            plan_name={content.plan_name}
            plan_type={content.plan_type}
            plan_cost={content.plan_cost}
            plan_score={content.plan_score}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardList;
