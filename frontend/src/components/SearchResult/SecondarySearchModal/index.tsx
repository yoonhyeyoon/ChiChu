import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ModalTitle, styledModal } from './styles';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { CustomButtonRoot } from '../../Common/CHICHUButton/styles';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Gender from '../../Search/Gender/Index';
import BirthDate from '../../Search/BirthDate';
import Period from '../../Search/Period';
import { useRecoilValue } from 'recoil';
import { UserGender } from '../../../recoil/UserGender';
import { UserAge } from '../../../recoil/UserAge';
import { PlanFilteredList } from '../../../recoil/PlanFilteredList';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function SecondarySearchModal() {
  const gender = useRecoilValue(UserGender);
  const age = useRecoilValue(UserAge);
  // const planList = useRecoilValue(PlanFilteredList);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(gender, age);
  // console.log(planList?.chichu.length);
  return (
    <div>
      <Button onClick={handleOpen}>
        납입, 보험기간
        <ZoomInIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styledModal}>
            {/* 모달 시작 */}
            <Container>
              <div>
                <ModalTitle>조금만 더 구체적으로 찾아볼게요!</ModalTitle>
              </div>
              <Box
                sx={{
                  marginTop: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Stack spacing={5} direction="row">
                  <Box>
                    <Gender />
                  </Box>
                  <Box>
                    <BirthDate />
                  </Box>
                </Stack>
                <Stack spacing={5} direction="row">
                  <Box>
                    <Period label="납입기간" />
                  </Box>
                  <Box>
                    <Period label="보험기간" />
                  </Box>
                </Stack>

                {/* <PlanTags /> */}

                <Stack sx={{ marginTop: 3 }}>
                  <CustomButton
                    // disabled={userAge && userGender != null ? false : true}
                    onClick={handleClose}
                  >
                    확인
                  </CustomButton>
                </Stack>
              </Box>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SecondarySearchModal;
