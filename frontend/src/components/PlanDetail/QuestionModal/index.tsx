import React from 'react';
import { Box } from '@mui/system';
import { StyledModal, Backdrop, style } from './styles';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function QuestionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          {/* <h2 id="unstyled-modal-title">{title}</h2>
          <p id="unstyled-modal-description">{text}</p> */}
        </Box>
      </StyledModal>
    </div>
  );
}
