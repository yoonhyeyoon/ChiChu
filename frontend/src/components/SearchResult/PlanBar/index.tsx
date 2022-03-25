import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';

import { PlanPreviewType } from '../../../types/types';
import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';

function PlanBar(props: PlanPreviewType) {
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
          <Stack direction="row" justifyContent="space-between" paddingX={7}>
            <Stack direction="row" spacing={4}>
              <Stack direction="column">
                <span>설계 유형</span>
                <h3>{props.plan_type}</h3>
              </Stack>
              <Stack direction="column">
                <span>보험료</span>
                <h3>{props.plan_cost}</h3>
              </Stack>
            </Stack>
            <Box sx={{ width: '33%' }}>
              <ProgressBarWithNumber plan_score={props.plan_score} />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlanBar;
