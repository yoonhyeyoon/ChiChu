import PostCarousel from '../components/PlanTip/PostCarousel';
import { Box, Container } from '@mui/material';
import OptionCards from '../components/PlanTip/OptionCardSet';
import Header from '../components/Common/Header';
import { NormalBoldText } from '../components/PlanDetail/styles';

const PlanTip = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box style={{ width: '80vw' }}>
            <NormalBoldText
              style={{
                alignSelf: 'start',
                marginTop: '30px',
                marginBottom: '20px',
              }}
            >
              포스트
            </NormalBoldText>
            <PostCarousel />
          </Box>
          <br />
          <br />
          <Box style={{ width: '80vw' }}>
            <NormalBoldText
              style={{
                alignSelf: 'start',
                marginTop: '30px',
                marginBottom: '10px',
              }}
            >
              이럴 때는 이런 보장!
            </NormalBoldText>
          </Box>
          <OptionCards />
        </Box>
      </Container>
    </>
  );
};

export default PlanTip;
