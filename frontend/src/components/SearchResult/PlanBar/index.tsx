import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';

import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import { ProductType } from '../../../types/types';

function PlanBar({ content }: { content: ProductType }) {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              src={content.company_name}
              alt={content.company_name}
              variant="rounded"
            />
          }
          title={content.company_name}
          subheader={content.product_name}
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" paddingX={7}>
            <Stack direction="row" spacing={4}>
              <Stack direction="column">
                <span>설계 유형</span>
                <h3>{content.subtype_code}</h3>
              </Stack>
              <Stack direction="column">
                <span>보험료</span>
                <h3>{content.rate}</h3>
              </Stack>
            </Stack>
            <Box sx={{ width: '33%' }}>
              <ProgressBarWithNumber plan_score={50} />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlanBar;
