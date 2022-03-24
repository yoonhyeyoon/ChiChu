import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import { PlanPreviewType } from '../types/types';
import sample from '../components/SearchResult/sample.json';

function SearchResult(): JSX.Element {
  const planList: PlanPreviewType[] = sample;

  planList.sort((a, b) => {
    return a.plan_score > b.plan_score
      ? -1
      : a.plan_score < b.plan_score
      ? 1
      : 0;
  });

  return (
    <>
      <PlanCardList list={planList.slice(0, 3)} />
      <PlanBarList list={planList.slice(4, undefined)} />
    </>
  );
}

export default SearchResult;
