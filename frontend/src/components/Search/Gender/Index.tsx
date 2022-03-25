import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserGender } from '../../../recoil/UserGender';
import {
  StyledButton,
  StyledListbox,
  StyledOption,
  StyledPopper,
} from './styles';

import SelectUnstyled, {
  SelectUnstyledProps,
  SelectOption,
} from '@mui/base/SelectUnstyled';

function CustomSelect(props: SelectUnstyledProps<number>) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

function renderValue(option: SelectOption<number> | null) {
  console.log(option);
  if (option == null) {
    return <span>선택해주세요.</span>;
  }

  return <span>{option.label}</span>;
}

function Gender() {
  const setUserGender = useSetRecoilState(UserGender);
  const handleChange = (e: number | null) => {
    setUserGender(e);
  };
  return (
    <CustomSelect renderValue={renderValue} onChange={handleChange}>
      <StyledOption value={1}>남성</StyledOption>
      <StyledOption value={2}>여성</StyledOption>
    </CustomSelect>
  );
}
export default Gender;
