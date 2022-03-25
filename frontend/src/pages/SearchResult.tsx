import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button } from '@mui/material';

import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import SortButton from '../components/SearchResult/SortButton';
import { PlanPreviewType } from '../types/types';
import { planListState } from '../recoil/searchResultState';

function SearchResult(): JSX.Element {
  const planList = useRecoilValue<PlanPreviewType[]>(planListState);
  const [showMore, setShowMore] = useState(false);

  return (
    <>
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
        </>
      )}
    </>
  );
}

export default SearchResult;
