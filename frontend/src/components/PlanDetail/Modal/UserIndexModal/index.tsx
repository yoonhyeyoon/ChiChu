import React from 'react';
import { Box } from '@mui/system';
import { StyledModal } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CHICHUModal from '../../../Common/CHICHUModal';
import { UserIndexText } from './UserIndexText';

export default function CompanyIndexModal() {
  return (
    <StyledModal>
      <span>유저지수</span>
      <CHICHUModal
        element={<UserIndexText />}
        icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
      ></CHICHUModal>
    </StyledModal>
  );
}
