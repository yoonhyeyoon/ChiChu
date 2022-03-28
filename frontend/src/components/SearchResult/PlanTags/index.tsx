import React, { useEffect, useState } from 'react';
import { PlanTagType } from '../../../types/types';
import sample from './sample.json';
import planList from './list.json';
import { PlanTagButton } from './styles';

import Stack from '@mui/material/Stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlanListSelector } from '../../../recoil/PlanListSelector';
import { PlanTaggedList } from '../../../recoil/PlanTaggedList';

type toggleList = string[];
type PlanTagButtonType = {
  plan_tag: string;
  toggleList: toggleList;
  setToggleList: React.Dispatch<React.SetStateAction<toggleList>>;
};

//더미 임시
export type ProductType = {
  product_code: string;
  product_name: string;
  company_code: number;
  company_name: string;
  subtype_code: number;
  rate: number;
  option_code: string[];
  option_name: string[];
};

export type PlanListType = {
  cheap: ProductType[];
  chichu: ProductType[];
  coverage: ProductType[];
  popular: ProductType[];
  reasonable: ProductType[];
};
//

const Button = ({ plan_tag, toggleList, setToggleList }: PlanTagButtonType) => {
  const [toggle, setToggle] = useState(false);
  const [planTaggedList, setPlanTaggedList] = useRecoilState(PlanListSelector);
  // atom으로 따로 불러와야함
  const plans = useRecoilValue(PlanTaggedList);
  // const plans: PlanListType = planList;
  // console.log(plans);
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

  useEffect(() => {
    // console.log(toggleList);
    // toggleList에 있는 tag만 포함된 planTaggedList로 filtering 반환
    let toggledListCopy = toggleList;
    function checkTagged(el: string) {
      // console.log(el);
      if (toggledListCopy.includes(el)) {
        toggledListCopy = toggledListCopy.filter(element => element !== el);
        // console.log(el, toggledListCopy);
        if (toggledListCopy.length == 0) {
          // console.log(el, '성공인디');
          toggledListCopy = toggleList;
          return true;
        }
      }
    }

    if (planTaggedList) {
      const newDict: PlanListType = { ...planTaggedList };
      newDict['cheap'] = planTaggedList.cheap.filter(product =>
        product.option_name.some(checkTagged),
      );
      // const newList = planTaggedList.cheap.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      newDict['chichu'] = planTaggedList.chichu.filter(product =>
        product.option_name.some(checkTagged),
      );
      newDict['popular'] = planTaggedList.popular.filter(product =>
        product.option_name.some(checkTagged),
      );
      newDict['coverage'] = planTaggedList.coverage.filter(product =>
        product.option_name.some(checkTagged),
      );
      newDict['reasonable'] = planTaggedList.reasonable.filter(product =>
        product.option_name.some(checkTagged),
      );
      // console.log(planTaggedList, newDict);
      setPlanTaggedList(newDict);
    }
  }, [toggleList]);

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
