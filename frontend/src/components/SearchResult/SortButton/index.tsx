import React from 'react';
import { useRecoilState } from 'recoil';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { sortByState } from '../../../recoil/searchResultState';

function SortButton() {
  const [sortBy, setSortBy] = useRecoilState(sortByState);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSortBy: string,
  ) => {
    if (newSortBy !== null) {
      setSortBy(newSortBy);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={sortBy}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="chichu">치츄지수순</ToggleButton>
      <ToggleButton value="cheap">보험료 낮은 순</ToggleButton>
      <ToggleButton value="coverage">보장 많은 순</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SortButton;
