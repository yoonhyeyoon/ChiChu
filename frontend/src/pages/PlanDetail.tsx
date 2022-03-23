import React from 'react';
import ProgressBar from '../components/PlanDetail/ProgressBar';
import QuestionModal from '../components/PlanDetail/QuestionModal';

const PlanDetail = (): JSX.Element => {
  return (
    <div>
      <ProgressBar value={70.5} />
      <QuestionModal title="보철치료란?" text="보철치료란...을 말합니다." />
    </div>
  );
};

export default PlanDetail;
