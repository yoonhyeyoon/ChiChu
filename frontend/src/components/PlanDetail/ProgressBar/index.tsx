import React from 'react';
import { BorderLinearProgress } from './styles';

export type ProgressBarType = {
  value: number;
};

export default function ProgressBar(props: ProgressBarType) {
  return <BorderLinearProgress variant="determinate" value={props.value} />;
}
