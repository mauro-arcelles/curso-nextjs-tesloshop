import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const FullScreenLoading = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 100px)'
    >
      <Typography sx={{ marginBottom: 3 }} variant='h2' fontWeight={200} fontSize={20}>Cargando...</Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};

export default FullScreenLoading;