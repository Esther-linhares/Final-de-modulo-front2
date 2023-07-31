import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userCreateAsyncThunk, loginAsyncThunk,   getTaskAsyncThunk } from '../store/modules/UserLoggedSlice';
import AlertComponent from './Alert';
import { getUsersAsyncThunk } from '../store/modules/UsersSlice';

interface FormProps {
	mode: 'signin' | 'signup';
	textButton: string;
}

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);
  const listUsers =  useAppSelector(state => state.users.users);
  /* const users = useAppSelector(selectAllUsers);*/
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({ success: false, text: '', display: 'none' });

  useEffect(() => {
    if (mode === 'signup') {

      const emailValid =
				(email.endsWith('.com') || email.endsWith('.com.br')) &&
				email.includes('@');

      if (email.length > 0) {
        setErrorEmail(!emailValid);
      }

      const passwordValid = password.length >= 6;
      if (password.length > 0) {
        setErrorPassword(!passwordValid);
      }

      const repasswordValid = password === repassword;

      if (repassword.length > 0) {
        setErrorRepassword(!repasswordValid);
      }

      setDisabled(!(emailValid && passwordValid && repasswordValid));
    }
  }, [email, password, repassword, mode]);

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    dispatch(getUsersAsyncThunk());
    if (mode === 'signin') {
      const user = {
        email: email,
        password: password,
      };

      const userExist = listUsers.find(
        (value) =>
          value.email === user.email &&
					value.password === user.password
      );
      if (!userExist) {
        setShowAlert({
          display: 'show',
          success: false,
          text: 'Usuário ou senha incorretos!',
        });
        setTimeout(() => {
          setShowAlert({ display: 'none', success: true, text: '' });
        }, 1000);
        return;
      } 
      
      dispatch(loginAsyncThunk(user));
      setTimeout(() => {
        dispatch(getTaskAsyncThunk(user.email));
        dispatch(getUsersAsyncThunk());
      }, 200);
      navigate('/notes');
    } else {
      const newUser = {
        email,
        password,
        repassword,
      };

      const retorno = listUsers.some(
        (value) => value.email === newUser.email
      );
      if (retorno) {
        setShowAlert({
          display: 'show',
          success: false,
          text: 'Email já cadastrado!',
        });
        setTimeout(() => {
          setShowAlert({ display: 'none', success: true, text: '' });
        }, 1000);
        return;
      }

      setShowAlert({
        display: 'show',
        success: true,
        text: 'Conta criada com sucesso!',
      });
      setTimeout(() => {
        setShowAlert({ display: 'none', success: true, text: '' });
      }, 1000);

      dispatch(userCreateAsyncThunk(newUser));
    }
  }
  return (
    <Box>
      <AlertComponent success={showAlert.success} text={showAlert.text} display={showAlert.display} />
      <Box component="form" marginTop={3} onSubmit={(ev) => handleSubmit(ev)}>
        <TextField
          error={errorEmail}
          helperText={errorEmail ? 'E-mail inválido' : ''}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          margin="normal"
          variant="outlined"
          type="email"
          required
          id="email"
          label="E-mail"
          fullWidth
        />
        <TextField
          error={errorPassword}
          helperText={
            errorPassword
              ? 'Senha deve conter ao menos 6 caracteres'
              : ''
          }
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          margin="normal"
          variant="outlined"
          type="password"
          required
          id="password"
          label="Senha"
          fullWidth
        />

        {mode === 'signup' ? (
          <TextField
            error={errorRepassword}
            helperText={
              errorRepassword ? 'As senhas não coincidem' : ''
            }
            value={repassword}
            onChange={(ev) => setRepassword(ev.target.value)}
            margin="normal"
            variant="outlined"
            type="password"
            required
            id="repassword"
            label="Repetir Senha"
            fullWidth
          />
        ) : ''}

        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          {textButton}
        </Button>
        <Grid container>
          <Grid item xs={8} textAlign="end">
            {mode === 'signin' ? (
              <Typography variant="body2">
                <Link style={{ color: 'inherit' }} to="/signup">
                            Não tem uma conta? Cadastre-se
                </Link>
              </Typography>
            ) : (
              <Typography variant="body2">
                <Link style={{ color: 'inherit' }} to="/">
                            Já possui conta? Vá para Login
                </Link>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Form;