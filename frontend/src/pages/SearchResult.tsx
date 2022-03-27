import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button } from '@mui/material';

import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import RelatedPlanList from '../components/SearchResult/RelatedPlanList/RelatedPlanList';
import SortButton from '../components/SearchResult/SortButton';
import { PlanPreviewType } from '../types/types';
import { planListState } from '../recoil/searchResultState';

function SearchResult(): JSX.Element {
  const planList = useRecoilValue<PlanPreviewType[]>(planListState);
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SortButton />

        <PlanCardList list={planList.slice(0, 3)} />

        <Box textAlign="center">
          <Button onClick={() => setShowMore(cur => !cur)}>
            {showMore ? '접기' : '더 보기'}
          </Button>
        </Box>

        {showMore && (
          <>
            <PlanBarList list={planList.slice(4)} />
            <h2>아직 잘 모르시겠다면 추천해드릴게요!</h2>
            <h3>이런 보험을 많이 찾아요!</h3>
            <RelatedPlanList list={planList} />
            <h3>가성비가 좋아요!</h3>
            <RelatedPlanList list={planList} />
          </>
        )}
      </Suspense>
    </>
  );
}

export default SearchResult;
