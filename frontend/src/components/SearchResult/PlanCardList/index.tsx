import { Grid } from '@mui/material';

import Card from '../PlanCard';
import { ProductType } from '../../../types/types';

function CardList({ list }: { list: ProductType[] }) {
  return (
    <Grid container spacing={2}>
      {list.map(content => (
        <Grid item xs={4} key={content.product_name}>
          <Card content={content} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardList;
