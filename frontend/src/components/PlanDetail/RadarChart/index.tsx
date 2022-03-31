import React from 'react';
import { Container } from './styles';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type PropType = {
  option_group: {
    NAME: string;
    COVERAGE: number;
    RATE: number;
  }[];
};

export function RadarChart(props: PropType) {
  const values = Object.values(props);
  const label_arr = [];
  const data_arr = [];
  for (const item of values[0]) {
    label_arr.push(item['NAME']);
    data_arr.push(item['RATE']);
  }
  // 담보 값 없으면 분기처리
  if (values[0].length < 3) {
    if (!label_arr.includes('치아보존치료비')) {
      label_arr.push('치아보존치료비');
      data_arr.push(0);
    }
    if (!label_arr.includes('치아신경치료비')) {
      label_arr.push('치아신경치료비');
      data_arr.push(0);
    }
    if (!label_arr.includes('치아보철치료비')) {
      label_arr.push('치아보철치료비');
      data_arr.push(0);
    }
  }

  const data = {
    labels: label_arr,
    datasets: [
      {
        label: '상대적 보장우수성',
        data: data_arr,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Radar data={data} />
    </Container>
  );
}
