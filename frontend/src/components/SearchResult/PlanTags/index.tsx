import React, { useEffect, useState } from 'react';
import { PlanTagType } from '../../../types/types';
import sample from './sample.json';
import planList from './list.json';
import { PlanTagButton } from './styles';

import Stack from '@mui/material/Stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlanListSelector } from '../../../recoil/PlanListSelector';

type toggleList = string[];
type PlanTagButtonType = {
  plan_tag: string;
  toggleList: toggleList;
  setToggleList: React.Dispatch<React.SetStateAction<toggleList>>;
};

//더미 임시
type ProductType = {
  product_code: string;
  product_name: string;
  user_index: number;
  company_code: string;
  company_name: string;
  subtype_code: string;
  rate: number;
  option_code: string[];
  option_name: string[];
};

type PlanListType = {
  인기순: Array<ProductType>;
};
//

const Button = ({ plan_tag, toggleList, setToggleList }: PlanTagButtonType) => {
  const [toggle, setToggle] = useState(false);
  const [planTaggedList, setPlanTaggedList] = useRecoilState(PlanListSelector);
  const plans: PlanListType = planList;
  console.log(planTaggedList);
  const onChangeColor = () => {
    if (toggleList.includes(plan_tag)) {
      // 없으면
      setToggleList(toggleList.filter(el => el !== plan_tag)); //제거
      setToggle(!toggle);
    } else {
      // 있으면
      setToggleList([...toggleList, plan_tag]); // 넣어줌
      setToggle(!toggle);
    }
  };

  // useEffect(() => {
  //   // console.log(toggleList);
  //   // toggleList에 있는 tag만 포함된 planTaggedList로 filtering 반환
  //   let trueCnt = 0;
  //   function checkTagged(el: any) {
  //     console.log(el);
  //     if (toggleList.includes(el)) {
  //       trueCnt++;
  //       if (trueCnt === toggleList.length) {
  //         return true;
  //       }
  //     }
  //   }

  //   if (planTaggedList) {
  //     console.log(planTaggedList.data.cheap);
  //     const newList = planTaggedList.data.cheap.filter(product =>
  //       product.option_name.some(checkTagged),
  //     );
  //     console.log(newList);
  //   }

  //   // setPlanTaggedList(newList);
  // }, [toggleList]);

  return (
    <PlanTagButton
      // id={String(id)}
      onClick={onChangeColor}
      istag={toggleList.includes(plan_tag) ? 'true' : null}
    >
      {plan_tag}
    </PlanTagButton>
  );
};

function PlanTags() {
  const tagList: PlanTagType[] = sample;

  const [toggleList, setToggleList] = useState<toggleList>([]);
  return (
    <>
      <Stack spacing={2} direction="row">
        {tagList.map(tag => (
          <Button
            key={tag.id}
            plan_tag={tag.plan_tag}
            toggleList={toggleList}
            setToggleList={setToggleList}
          />
        ))}
      </Stack>
    </>
  );
}

export default PlanTags;
