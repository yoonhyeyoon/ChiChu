import React from 'react';
import { BorderLinearProgress } from './styles';

export default function ProgressBar() {
  return <BorderLinearProgress variant="determinate" value={50} />;
}
