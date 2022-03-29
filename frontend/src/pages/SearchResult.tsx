import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';

import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import RelatedPlanList from '../components/SearchResult/RelatedPlanList/RelatedPlanList';
import SortButton from '../components/SearchResult/SortButton';
import { PlanPreviewType } from '../types/types';
import { planListState } from '../recoil/searchResultState';
import PlanTags from '../components/SearchResult/PlanTags';
import PlanRateRange from '../components/SearchResult/PlanRateRange';
import { PlanFilteredList } from '../recoil/PlanFilteredList';
import SecondarySearch from '../components/SearchResult/SecondarySearchModal';

function SearchResult(): JSX.Element {
  const planList = useRecoilValue<PlanPreviewType[]>(planListState);
  const [showMore, setShowMore] = useState(false);
  const plans = useRecoilValue(PlanFilteredList);
  if (plans) {
    console.log(plans.popular.slice(1, 2));
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'center',
            }}
          >
            <SecondarySearch />
            <PlanTags />
            <PlanRateRange />
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
          </Box>
        </Container>
      </Suspense>
    </>
  );
}

export default SearchResult;
