import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getFilterAsyncThunk,  getTaskAsyncThunk,  logout } from '../store/modules/UserLoggedSlice';
import { Divider, Grid } from '@mui/material';

const settings = ['Logout'];

const ResponsiveAppBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [textFilter, setTextFilter] = React.useState('');
  const userLogged = useAppSelector(state => state.userLogged.userLogged);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleClose = () => {
    setAnchorElUser(null);
  };
  const reloadFilter = () =>{
    dispatch(getTaskAsyncThunk(userLogged.email));
  };

  const actionFilter= () => {
    dispatch(getFilterAsyncThunk({email: userLogged.email, title: textFilter})); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container display={'flex'} width={'100%'} height={'100%'} justifyContent={'space-around'} alignItems={'center'}>
            <Grid item>
              <Typography
                variant="h5"
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'flex', alignSelf: 'center' },
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                Notas
              </Typography>
            </Grid>
            <Grid item>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '50px'}}
              >
                <InputBase  value={textFilter} 
                  onChange={(event) => setTextFilter(event.target.value)} 
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Pesquisar"
                  inputProps={{ 'aria-label': 'Pesquisar' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={actionFilter}>
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '9px' }} onClick={reloadFilter}>
                  <ReplayOutlinedIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ color: '#638566', bgcolor: '#acc69b' }} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleClose}
                >
                  {settings.map(setting => (
                    <MenuItem key={setting}>
                      <Typography onClick={handleCloseUserMenu} textAlign="center">
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>

         
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
