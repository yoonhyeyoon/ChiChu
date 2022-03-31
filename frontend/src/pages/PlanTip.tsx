import React from 'react';
import PostCarousel from '../components/PlanTip/PostCarousel';
import { postList } from '../components/PlanTip/PostCarousel/postList';

const PlanTip = (): JSX.Element => {
  return (
    <div>
      <PostCarousel postList={postList} />
    </div>
  );
};

export default PlanTip;
