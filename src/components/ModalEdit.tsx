import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import TTask from '../types/TypeTask';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTaskAsyncThunk, taskUpdateAsyncThunk } from '../store/modules/UserLoggedSlice';

interface ModalEditProps {
    taskEdit: TTask,
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({ taskEdit, openModal, actionCancel, actionConfirm }) => {

  const dispatch = useAppDispatch();
  const[editTask, setEditTask] = React.useState(taskEdit);
  const userLogged = useAppSelector(state => state.userLogged.userLogged);


  /*   useEffect(() =>{
    dispatch(updateUser({id: userLogged.email, changes: userLogged}));
  },[userLogged]);
   */
  const handleClose = () => {
    actionCancel();
  };

  const handleConfirm = () =>{
    dispatch(taskUpdateAsyncThunk({id: editTask.id, email: userLogged.email,
      title: editTask.title,
      description: editTask.description}));
    setTimeout(() => {
      dispatch(getTaskAsyncThunk(userLogged.email));
    }, 200);
    actionConfirm();
  };

  return (
    <Box>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>{'Edite seu recado:'}</DialogContentText>
          <TextField
            sx={{
              '& label.Mui-focused': {
                color: '#222',
              },
              ' & .MuiInputBase-input': {
                '&.Mui-focused fieldset': {
                  borderColor: '#222',
                },
              },
            }}
            autoFocus
            margin="dense"
            id="titleTask"
            label="Titulo do recado"
            type={'text'}
            fullWidth
            name='title'
            onChange={e => setEditTask(state => ({ ...state, title: e.target.value }))}
            value={editTask.title}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descriptionTask"
            label="Descrição do recado"
            type={'text'}
            fullWidth
            name="description"
            onChange={e => setEditTask(state => ({ ...state, description: e.target.value }))}
            value={editTask.description}
            variant="standard"
            sx={{ hover: 'false' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#222' }}>
                            Cancelar
          </Button>
          <Button onClick={handleConfirm} sx={{ color: '#222' }}>
                            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalEdit;