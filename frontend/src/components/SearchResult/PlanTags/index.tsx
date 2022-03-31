import React, { useEffect, useState } from 'react';
import { PlanListType, PlanTagType } from '../../../types/types';
import sample from './sample.json';
import { PlanTagButton } from './styles';

import Stack from '@mui/material/Stack';
import { useRecoilState } from 'recoil';
import { PlanListSelector } from '../../../recoil/PlanListSelector';

type toggleList = string[];
type PlanTagButtonType = {
  plan_tag: string;
  toggleList: toggleList;
  setToggleList: React.Dispatch<React.SetStateAction<toggleList>>;
};

const Button = ({ plan_tag, toggleList, setToggleList }: PlanTagButtonType) => {
  const [toggle, setToggle] = useState(false);
  const [planFilteredList, setPlanFilteredList] =
    useRecoilState(PlanListSelector);
  // atom으로 따로 불러와야함
  // const plans = useRecoilValue(PlanFilteredList);
  // const plans: PlanListType = planList;
  // console.log(plans?.cheap);
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
    function checkTagged(option: string) {
      // console.log(option);
      if (toggledListCopy.includes(option)) {
        toggledListCopy = toggledListCopy.filter(element => element !== option);
        // console.log(option, toggledListCopy);
        if (toggledListCopy.length == 0) {
          // console.log(option, '성공인디');
          toggledListCopy = toggleList;
          return true;
        }
      }
    }

    if (planFilteredList && toggleList.length) {
      console.log(toggleList);
      const newDict: PlanListType = { ...planFilteredList };
      newDict['cheap'] = planFilteredList.cheap.filter(product =>
        product.option_name.some(checkTagged),
      );
      // const newList = planFilteredList.cheap.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      newDict['chichu'] = planFilteredList.chichu.filter(product =>
        product.option_name.some(checkTagged),
      );
      // newDict['popular'] = planFilteredList.popular.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      newDict['coverage'] = planFilteredList.coverage.filter(product =>
        product.option_name.some(checkTagged),
      );
      // newDict['reasonable'] = planFilteredList.reasonable.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      console.log(planFilteredList, newDict);
      setPlanFilteredList(newDict);
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
