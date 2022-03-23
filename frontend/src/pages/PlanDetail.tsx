import React from 'react';
import ProgressBar from '../components/PlanDetail/ProgressBar';
import QuestionModal from '../components/PlanDetail/QuestionModal';

const PlanDetail = (): JSX.Element => {
  return (
    <div>
      <ProgressBar />
      <QuestionModal />
    </div>
  );
};

export default PlanDetail;
