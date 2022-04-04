import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { One } from '../components/PlanTip/PostCarousel/PostPages/One';
import { Three } from '../components/PlanTip/PostCarousel/PostPages/Three';
import { Two } from '../components/PlanTip/PostCarousel/PostPages/Two';
import Header from '../components/Common/Header';

interface CustomState {
  state: {
    articlenum: number;
  };
}

function PlanTipPost() {
  const location = useLocation();
  const state = location.state as CustomState;

  return (
    <>
      <Header />
      <Container sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '80%',
            minWidth: '60%',
          }}
        >
          {state['articlenum'] === 1 ? <One /> : null}
          {state['articlenum'] === 2 ? <Two /> : null}
          {state['articlenum'] === 3 ? <Three /> : null}
        </Box>
      </Container>
    </>
  );
}

export default PlanTipPost;
