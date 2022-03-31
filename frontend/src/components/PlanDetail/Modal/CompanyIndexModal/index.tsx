import React from 'react';
import { StyledModal } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LongModal from '../LongModal';
import CompanyIndexText from './CompanyIndextext';

export default function CompanyIndexModal() {
  return (
    <StyledModal>
      <span>회사지수</span>
      <LongModal
        element={<CompanyIndexText />}
        icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
      ></LongModal>
    </StyledModal>
  );
}
