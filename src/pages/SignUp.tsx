import { Grid, Box, } from '@mui/material';
import React from 'react';
import Form from '../components/FormLogin';
import HeaderForm from '../components/HeaderForm';


const SignUp: React.FC = () => {

  return (
    <Grid container height="100vh">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/assets/img/notesImage.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repete',
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          component="section"
          marginY={8}
          marginX={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <HeaderForm title="Cadastre-se" color={'primary'} />

          <Form textButton="Criar Conta" mode="signup" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;