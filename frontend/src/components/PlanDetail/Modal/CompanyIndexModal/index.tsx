import React from 'react';
import { Box } from '@mui/system';
import { StyledModal, Backdrop, style } from './styles';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BasicTable from './BasicTable';

export default function CompanyIndexModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <span>회사지수</span>
      <IconButton onClick={handleOpen}>
        <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
      </IconButton>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">회사지수</h2>
          <BasicTable />
        </Box>
      </StyledModal>
    </div>
  );
}
