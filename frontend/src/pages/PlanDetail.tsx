import React from 'react';
import ProgressBar from '../components/PlanDetail/ProgressBar';
import QuestionModal from '../components/PlanDetail/QuestionModal';
import QuestionTooltip from '../components/PlanDetail/QuestionTooltip';

function PlanDetail() {
  return (
    <div>
      <div className="center">
        <h1>보험사명</h1>
        <p>보험상품명</p>
        <ProgressBar value={70.5} />
        <QuestionModal title="보철치료란?" text="보철치료란...을 말합니다." />
        <QuestionTooltip />
      </div>
    </div>
  );
}

export default PlanDetail;
