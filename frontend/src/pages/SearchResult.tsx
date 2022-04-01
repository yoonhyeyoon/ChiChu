import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, Container } from '@mui/material';

import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import PlanRateRange from '../components/SearchResult/PlanRateRange';
import PlanTags from '../components/SearchResult/PlanTags';
import RelatedPlanList from '../components/SearchResult/RelatedPlanList';
import SecondarySearchModal from '../components/SearchResult/SecondarySearchModal';
import SortButton from '../components/SearchResult/SortButton';

import { checkedPlanListState } from '../recoil/planComparisonState';
import { PlanFilteredList } from '../recoil/PlanFilteredList';
import { planListState } from '../recoil/searchResultState';
import { UserPeriod } from '../recoil/UserPeriod';
import { ProductType } from '../types/types';

function SearchResult(): JSX.Element {
  // as 를 쓰면 타입을 강제로 선언할 수 있음.
  const planList = useRecoilValue(planListState);
  const popularList = useRecoilValue(PlanFilteredList)
    ?.popular as ProductType[];
  const reasonableList = useRecoilValue(PlanFilteredList)
    ?.reasonable as ProductType[];
  const checkedPlanList = useRecoilValue(checkedPlanListState);

  const [showMore, setShowMore] = useState(false);
  const userPeriod = useRecoilValue(UserPeriod);
  console.log(userPeriod);

  return (
    <>
      {/* Suspense는 같은 컴포넌트에서 써도 효과 있음 */}
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
            {/* <CHICHUModal
              icon={<AddAlarmIcon />}
              element={<SecondarySearch />}
            /> */}
            <SecondarySearchModal />
            <PlanTags />
            <PlanRateRange />
            <SortButton />
            {checkedPlanList}

            {/* 오류 회피를 위해, planList가 있을 때만 렌더링 */}
            {planList && (
              <>
                <PlanCardList list={planList.slice(0, 3)} />

                <Box textAlign="center">
                  <Button onClick={() => setShowMore(cur => !cur)}>
                    {showMore ? '접기' : '더 보기'}
                  </Button>
                </Box>
                <Box display={showMore ? 'run-in' : 'none'}>
                  <PlanBarList list={planList.slice(4)} />
                </Box>

                <h2>아직 잘 모르시겠다면 추천해드릴게요!</h2>
                <h3>이런 보험을 많이 찾아요!</h3>
                <RelatedPlanList list={popularList} />
                <h3>가성비가 좋아요!</h3>
                <RelatedPlanList list={reasonableList} />
              </>
            )}
          </Box>
        </Container>
      </Suspense>
    </>
  );
}

export default SearchResult;
