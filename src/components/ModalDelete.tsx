import React, { useEffect, useState } from 'react';
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
import { getTaskAsyncThunk, taskDeleteAsyncThunk } from '../store/modules/UserLoggedSlice';

interface ModalDeleteProps {
    deleteTask: TTask,
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ deleteTask, openModal, actionCancel, actionConfirm }) => {

  const dispatch = useAppDispatch();
  const userLogged = useAppSelector(state => state.userLogged.userLogged);
  const listTasks = useAppSelector(state => state.userLogged.userLogged.tasks);


  /*   useEffect(() =>{
    dispatch(updateUser({id: userLogged.email, changes: userLogged}));
  },[userLogged]);
   */
  const handleClose = () => {
    actionCancel();
  };

  const handleConfirm = () =>{
    console.log(deleteTask);
    dispatch(taskDeleteAsyncThunk({ id: deleteTask.id,
      email: userLogged.email}));
    setTimeout(() => {
      dispatch(getTaskAsyncThunk(userLogged.email));
    }, 200);
    actionConfirm();
  };


  return (
    <Box>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>Tem certeza que deseja excluir o recado {deleteTask?.title}?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} color="error">
                                Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );};

export default ModalDelete;
