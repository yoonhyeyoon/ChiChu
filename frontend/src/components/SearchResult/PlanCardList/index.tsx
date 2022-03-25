import { Grid } from '@mui/material';
import Card from '../PlanCard';
import { PlanPreviewType } from '../../../types/types';
import sample from './sample.json';

function CardList(): JSX.Element {
  const sampleList: PlanPreviewType[] = sample.slice(0, 3);

  return (
    <Grid container spacing={2}>
      {sampleList.map(content => (
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
