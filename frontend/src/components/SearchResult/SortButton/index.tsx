import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { PlanPreviewType } from '../../../types/types';
import { planListState } from '../../../recoil/searchResultState';

function SortButton() {
  const [sortBy, setSortBy] = useState('best');
  const [planList, setPlanList] = useRecoilState(planListState);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSortBy: string,
  ) => {
    if (newSortBy !== null) {
      setSortBy(newSortBy);
    }
  };

  const sort = (
    list: PlanPreviewType[],
    key: 'plan_score' | 'plan_cost' | 'plan_type',
    ascending: boolean,
  ) => {
    if (ascending) {
      const newList = list.slice().sort((a, b) => {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      });
      setPlanList(newList);
    } else {
      const newList = list.slice().sort((a, b) => {
        return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
      });
      setPlanList(newList);
    }
  };

  useEffect(() => {
    switch (sortBy) {
      case 'best':
        sort(planList, 'plan_score', false);
        break;
      case 'cost':
        sort(planList, 'plan_cost', true);
        break;
      case 'guarantee':
        sort(planList, 'plan_type', false);
        break;
    }
  }, [sortBy]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={sortBy}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="best">치츄지수순</ToggleButton>
      <ToggleButton value="cost">보험료 낮은 순</ToggleButton>
      <ToggleButton value="guarantee">보장 많은 순</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SortButton;
