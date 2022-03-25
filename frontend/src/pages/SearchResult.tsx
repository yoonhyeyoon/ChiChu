import { useRecoilValue } from 'recoil';

import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import SortButton from '../components/SearchResult/SortButton';
import { planListState } from '../recoil/searchResultState';

function SearchResult(): JSX.Element {
  const planList = useRecoilValue(planListState);

  return (
    <>
      <SortButton />
      <PlanCardList list={planList.slice(0, 3)} />
      <PlanBarList list={planList.slice(4)} />
    </>
  );
}

export default SearchResult;
