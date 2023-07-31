
import { Grid, Box, } from '@mui/material';
import React from 'react';
import Form from '../components/FormLogin';
import HeaderForm from '../components/HeaderForm';

const SignIn: React.FC = () => {

  return (
    <Grid container height="100vh">
      <Grid display={'flex'} component='section'
        item 
        sm={false}
        md={7}
        sx={{
          backgroundImage: 'url(/assets/img/imagemLogin.png)',
          backgroundPosition: 'center',
          backgroundSize: '70%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Grid item sm={12} md={5}>
        <Box
          component="section"
          marginY={8}
          marginX={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <HeaderForm title="Acessar App" color={'primary'} />

          <Form textButton="Logar" mode="signin" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
