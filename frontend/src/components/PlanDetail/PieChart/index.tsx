import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { Container } from './styles';

type PropType = {
  age_rate: {
    AGE_CAT: number;
    RATE: number;
  }[];
};

ChartJS.register(ArcElement, Tooltip);
export function PieChart(props: PropType) {
  const values = Object.values(props);
  const label_arr = [];
  const data_arr = [];

  for (const item of values[0]) {
    label_arr.push(item['AGE_CAT']);
    data_arr.push(item['RATE']);
  }

  const data = {
    labels: label_arr,
    datasets: [
      {
        label: '# of Votes',
        data: data_arr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Pie data={data} plugins={[ChartDataLabels]} />
    </Container>
  );
}
