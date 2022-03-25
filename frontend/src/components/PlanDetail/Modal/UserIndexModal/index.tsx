import React from 'react';
import { Box } from '@mui/system';
import { StyledModal, Backdrop, style } from './styles';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { UserIndexText } from './UserIndexText';

export default function UserIndexModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 모달 내 글 줄바꿈

  return (
    <div>
      <span>유저지수</span>
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
          <h2 id="unstyled-modal-title">유저지수</h2>
          <UserIndexText />
        </Box>
      </StyledModal>
    </div>
  );
}
