import React from 'react';
import { BorderLinearProgress } from './styles';
import { ProgressBarType } from '../../../types/types';

export default function ProgressBar(props: ProgressBarType) {
  return <BorderLinearProgress variant="determinate" value={props.value} />;
}
