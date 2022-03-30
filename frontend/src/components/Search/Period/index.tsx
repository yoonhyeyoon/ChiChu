import React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  SelectOption,
} from '@mui/base/SelectUnstyled';
import {
  StyledButton,
  StyledListbox,
  StyledOption,
  StyledPopper,
} from '../Gender/styles';
import { useRecoilState } from 'recoil';
import { UserPeriod } from '../../../recoil/UserPeriod';

function CustomSelect(props: SelectUnstyledProps<number>) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

function Period() {
  const [userPeriod, setUserPeriod] = useRecoilState(UserPeriod);
  const handleChange = (e: number | null) => {
    setUserPeriod(e);
  };

  return (
    <CustomSelect value={userPeriod} onChange={handleChange}>
      <StyledOption value={5}>5년</StyledOption>
      <StyledOption value={7}>7년</StyledOption>
      <StyledOption value={10}>10년</StyledOption>
      <StyledOption value={15}>15년</StyledOption>
      <StyledOption value={20}>20년</StyledOption>
    </CustomSelect>
  );
}

export default Period;