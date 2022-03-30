/**
 * Suspense는 부모 컴포넌트가 아니어도,
 * 같은 컴포넌트 상에서 적용이 됨.
 * 아래 코드들은 실험용.
 */

import { Suspense } from 'react';
// import SearchResult from './SearchResult';

function SearchResultWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <SearchResult /> */}
    </Suspense>
  );
}

export default SearchResultWrapper;
