import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from '@mui/material';
import { PlanCardType } from '../../../types/types';

function PlanCard(props: PlanCardType) {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              src={props.logo_img}
              alt={props.brand_name}
              variant="rounded"
            />
          }
          title={props.brand_name}
          subheader={props.plan_name}
        />
        <CardContent>
          <span>설계 유형</span>
          <h3>{props.plan_type}</h3>
          <span>보험료</span>
          <h3>{props.plan_cost}</h3>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlanCard;
