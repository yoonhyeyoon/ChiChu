import React, { useState } from 'react';
import { PlanTagType } from '../../../types/types';
import sample from './sample.json';
import { PlanTagButton } from './styles';

import Stack from '@mui/material/Stack';
import { useRecoilValue } from 'recoil';

type toggleList = string[];
type PlanTagButtonType = {
  plan_tag: string;
  toggleList: toggleList;
  setToggleList: React.Dispatch<React.SetStateAction<toggleList>>;
};

const Button = ({ plan_tag, toggleList, setToggleList }: PlanTagButtonType) => {
  const [toggle, setToggle] = useState(false);
  const color = toggle ? 'blue' : 'grey';

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
  // console.log(toggleList);
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
