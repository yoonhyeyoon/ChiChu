import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styledModal } from './styles';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { CustomButtonRoot } from '../../Common/CHICHUButton/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Gender from '../../Search/Gender/Index';
import BirthDate from '../../Search/BirthDate';
import Period from '../../Search/Period';
import { useRecoilValue } from 'recoil';
import { UserGender } from '../../../recoil/UserGender';
import { UserAge } from '../../../recoil/UserAge';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function SecondarySearchModal() {
  const gender = useRecoilValue(UserGender);
  const age = useRecoilValue(UserAge);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(gender, age);
  return (
    <div>
      <Button onClick={handleOpen}>
        {age}세 {gender == 1 ? '남성' : '여성'}
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
                <h2>기본정보수정</h2>
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
                    <span>성별</span>
                    <Gender />
                  </Box>
                  <Box>
                    <span>생년월일</span>
                    <BirthDate />
                  </Box>
                </Stack>
                <Stack spacing={5} direction="row">
                  <Box>
                    <span>납입기간</span>
                    <Period />
                  </Box>
                  <Box>
                    <span>보험기간</span>
                    <Period />
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
