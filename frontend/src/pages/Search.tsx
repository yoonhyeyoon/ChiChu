import React from 'react';
import BirthDate from '../components/Search/BirthDate';
import Gender from '../components/Search/Gender/Index';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import DefaultInfo from '../components/Search/DefaultInfo';
import Button from '../components/Search/Button';
import PlanTags from '../components/SearchResult/PlanTags';

function Search() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
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
        <DefaultInfo />
        <Button />
        <PlanTags />
      </Box>
    </Container>
  );
}

export default Search;
