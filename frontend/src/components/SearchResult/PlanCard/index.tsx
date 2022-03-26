import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from '@mui/material';

import { PlanPreviewType } from '../../../types/types';
import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';

function PlanCard(props: PlanPreviewType) {
  return (
    <Card>
      <CardActionArea>
        <a
          href="#"
          style={{ textDecoration: 'none' }}
          onClick={e => {
            if (props.moving) {
              e.preventDefault();
            }
          }}
        >
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
            <ProgressBarWithNumber plan_score={props.plan_score} />
          </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
}

export default PlanCard;
