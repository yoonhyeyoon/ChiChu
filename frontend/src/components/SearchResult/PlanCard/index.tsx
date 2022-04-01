import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Checkbox,
} from '@mui/material';

// import ProgressBarWithNumber from '../../Common/ProgressBarWithNumber';
import { checkedPlanListState } from '../../../recoil/planComparisonState';
import { isEmpty } from '../../../utils/arrayFunctions';
import { ProductType } from '../../../types/types';

function PlanCard({ content }: { content: ProductType }) {
  const [checkedPlanList, setCheckedPlanList] =
    useRecoilState(checkedPlanListState);
  const [checked, setChecked] = useState(false);

  /** 현재 체크한 상품들의 목록을 업데이트하는 함수 */
  const updateCheckedPlanList = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (checked === false) {
      // 체크가 안 된 상태였을 경우, 목록에 추가
      setCheckedPlanList(checkedPlanList.concat(content.product_code));
    } else {
      // 체크된 상태였을 경우, 목록에서 제거
      setCheckedPlanList(
        checkedPlanList.filter(plan => plan !== content.product_code),
      );
    }
    // 체크 상태 변경
    setChecked(!checked);
  };

  return (
    <Card>
      <CardActionArea>
        <Link
          to={`./${content.product_code}`}
          state={{ product_code: content.product_code, py: content.py }}
          onClick={e => {
            if (content.moving) {
              e.preventDefault();
            }
            if (!isEmpty(checkedPlanList)) {
              updateCheckedPlanList(e);
            }
          }}
          style={{ textDecoration: 'none' }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={content.product_name}
                alt={content.company_name}
                variant="rounded"
              />
            }
            title={content.company_name}
            subheader={content.product_name}
            action={
              <Checkbox checked={checked} onClick={updateCheckedPlanList} />
            }
          />
          <CardContent>
            <span>설계 유형</span>
            <h3>{content.subtype_code}</h3>
            <span>보험료</span>
            <h3>{content.rate}</h3>
            {/* <ProgressBarWithNumber plan_score={content.rate} /> */}
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default PlanCard;
