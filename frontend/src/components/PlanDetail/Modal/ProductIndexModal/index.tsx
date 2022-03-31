import React from 'react';
import { Box } from '@mui/system';
import { StyledModal } from './styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CHICHUModal from '../../../Common/CHICHUModal';
import { ProductIndexText } from './ProductIndexText';

export default function CompanyIndexModal() {
  return (
    <StyledModal>
      <span>상품지수</span>
      <CHICHUModal
        element={<ProductIndexText />}
        icon={<HelpOutlineIcon sx={{ cursor: 'pointer' }} />}
      ></CHICHUModal>
    </StyledModal>
  );
}
