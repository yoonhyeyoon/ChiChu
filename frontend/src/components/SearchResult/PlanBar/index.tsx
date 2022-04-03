import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import { PlanPickerType, ProductType } from '../../../types/types';

function PlanBar({ content }: { content: ProductType }) {
  const planInfo: PlanPickerType = { ...content };
  const { CheckBoxLinked, updateCheckedPlanList, isEmptyList } =
    useCheckBoxLinked();

  return (
    <Card>
      <CardActionArea>
        <Link
          to={`./${content.product_code}`}
          state={{ product_code: content.product_code, py: content.py }}
          onClick={e => {
            if (!isEmptyList()) {
              updateCheckedPlanList(e, planInfo);
            }
          }}
          style={{ textDecoration: 'none' }}
        >
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
            action={<CheckBoxLinked prop={planInfo} />}
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
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default PlanBar;
