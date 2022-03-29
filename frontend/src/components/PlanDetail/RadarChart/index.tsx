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

// 프론트에서 값 없으면 분기처리

export function RadarChart(props: PropType) {
  const values = Object.values(props);
  const label_arr = [];
  const data_arr = [];

  for (const item of values[0]) {
    label_arr.push(item['NAME']);
    data_arr.push(item['RATE']);
  }

  const data = {
    labels: label_arr,
    datasets: [
      {
        label: '# of Votes',
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
