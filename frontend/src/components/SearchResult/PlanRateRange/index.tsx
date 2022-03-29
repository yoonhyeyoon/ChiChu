import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { PlanTaggedList } from '../../../recoil/PlanTaggedList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlanListSelector } from '../../../recoil/PlanListSelector';
import { PlanRateRangeSlider } from './styles';

function valuetext(value: number) {
  return `${value}°C입니다`;
}

export default function PlanRateRange() {
  const [planTaggedList, setPlanTaggedList] = useRecoilState(PlanListSelector);
  const [rate, setRate] = React.useState([0, 0]);
  const [maxRate, setMaxRate] = React.useState(0);
  console.log(planTaggedList);

  const rateLst: any = [];
  // const maxRate = 0;
  React.useEffect(() => {
    planTaggedList?.cheap.map(product => rateLst.push(product.rate));
    console.log(rateLst);
    setRate([0, Math.max(...rateLst)]);
    setMaxRate(Math.max(...rateLst));
  }, []);

  console.log(rateLst, rate);

  // const [value, setValue] = React.useState<number[]>(rate);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setRate(newValue as number[]);
  };

  return (
    <Box sx={{ width: 400 }}>
      <PlanRateRangeSlider
        getAriaLabel={() => 'Temperature range'}
        value={rate}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={maxRate}
        step={1000}
        marks
        disableSwap
      />
    </Box>
  );
}
