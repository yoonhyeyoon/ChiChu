import * as React from 'react';
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
  if (option == null) {
    return <span>선택해주세요.</span>;
  }

  return <span>{option.label}</span>;
}

export default function Gender() {
  return (
    <CustomSelect renderValue={renderValue}>
      <StyledOption value={0}>남성</StyledOption>
      <StyledOption value={1}>여성</StyledOption>
    </CustomSelect>
  );
}
