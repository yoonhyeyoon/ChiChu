import { Suspense, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, Container } from '@mui/material';

import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import PlanPicker from '../components/PlanComparison/PlanPicker';
import PlanRateRange from '../components/SearchResult/PlanRateRange';
import PlanTags from '../components/SearchResult/PlanTags';
import RelatedPlanList from '../components/SearchResult/RelatedPlanList';
import CHICHUModal from '../components/Common/CHICHUModal';
import SecondarySearchModal from '../components/SearchResult/SecondarySearchModal';
import SortButton from '../components/SearchResult/SortButton';

import { checkedPlanListState } from '../recoil/planComparisonState';
import { PlanFilteredList } from '../recoil/PlanFilteredList';
import { planListState } from '../recoil/searchResultState';
import { UserPeriod } from '../recoil/UserPeriod';
import { ProductType } from '../types/types';
import Header from '../components/Common/Header';
import { ModalTitle } from '../components/SearchResult/SecondarySearchModal/styles';
import { UserGender } from '../recoil/UserGender';
import { UserAge } from '../recoil/UserAge';

function SearchResult(): JSX.Element {
  const containerRef = useRef(null);

  const gender = useRecoilValue(UserGender);
  const age = useRecoilValue(UserAge);
  const planFilteredList = useRecoilValue(PlanFilteredList);

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
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Box
            sx={{
              paddingTop: 15,
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'center',
            }}
            ref={containerRef}
          >
            {/* <CHICHUModal
              icon={<AddAlarmIcon />}
              element={<SecondarySearch />}
            /> */}
            <ModalTitle>
              {age}세 {gender == 1 ? '남성' : '여성'}기준 검색결과, 총{' '}
              {planFilteredList?.chichu.length}개의 상품을 찾았어요!
            </ModalTitle>
            <SecondarySearchModal />
            <PlanTags />
            <PlanRateRange />
            <SortButton />

            {/* {checkedPlanList} */}
            <PlanPicker list={checkedPlanList} />

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
