import { Stack, Typography } from '@mui/material';

import { BorderLinearProgress } from './styles';

type ProgressBarWithNumberType = {
  plan_score: number;
  plan_average: number;
};

function ProgressBarWithNumber(props: ProgressBarWithNumberType) {
  return (
    <div>
      <Typography variant="h6" align="right">
        {props.plan_score}
      </Typography>
      <BorderLinearProgress variant="determinate" value={props.plan_score} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption" color="skyblue">
          0
        </Typography>
        <Typography variant="caption" color="skyblue">
          평균 {props.plan_average}
        </Typography>
        <Typography variant="caption" color="skyblue">
          100
        </Typography>
      </Stack>
    </div>
  );
}

ProgressBarWithNumber.defaultProps = {
  plan_average: 50,
};

export default ProgressBarWithNumber;
