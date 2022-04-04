import PostCarousel from '../components/PlanTip/PostCarousel';
import { Box, Container } from '@mui/material';
import OptionCards from '../components/PlanTip/OptionCardSet';
import Header from '../components/Common/Header';

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
            // alignItems: 'center',
          }}
        >
          <h1>포스트</h1>
          <PostCarousel />

          <br />

          <h1>이럴 때는 이런 보장!</h1>
          <OptionCards />
        </Box>
      </Container>
    </>
  );
};

export default PlanTip;
