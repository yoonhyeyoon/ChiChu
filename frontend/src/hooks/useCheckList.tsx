import React, { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Checkbox } from '@mui/material';

import { checkedPlanListState } from '../recoil/planComparisonState';
import { isEmpty } from '../utils/arrayFunctions';
import { PlanPickerType } from '../types/types';

function useCheckBoxLinked(planInfo: PlanPickerType) {
  const [checkedPlanList, setCheckedPlanList] =
    useRecoilState(checkedPlanListState);
  const [checked, setChecked] = useState(false);

  /** 현재 체크한 상품들의 목록을 업데이트하는 함수 */
  const updateCheckedPlanList = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    ) => {
      e.preventDefault();
      if (checked === false) {
        // 체크가 안 된 상태였을 경우, 목록에 추가
        setCheckedPlanList(checkedPlanList.concat(planInfo));
      } else {
        // 체크된 상태였을 경우, 목록에서 제거
        setCheckedPlanList(
          checkedPlanList.filter(
            plan => plan.product_code !== planInfo.product_code,
          ),
        );
      }
      // 체크 상태 변경
      setChecked(!checked);
    },
    [checked, checkedPlanList],
  );

  const isEmptyList = useCallback(
    () => isEmpty(checkedPlanList),
    [checkedPlanList],
  );

  function CheckBoxLinked() {
    return <Checkbox checked={checked} onClick={updateCheckedPlanList} />;
  }

  return { CheckBoxLinked, updateCheckedPlanList, isEmptyList };
}

export default useCheckBoxLinked;
