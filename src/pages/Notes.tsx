import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ModalInputs from '../components/ModalAdd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import TTask from '../types/TypeTask';
import ModalEdit from '../components/ModalEdit';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../components/ModalDelete';
import { getTaskAsyncThunk, taskArchiveAsyncThunk } from '../store/modules/UserLoggedSlice';


const Notes: React.FC = () => {
  const [archive, setArchive] = useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const listTaks = useAppSelector(state => state.userLogged.userLogged.tasks);
  const dispatch = useAppDispatch();
  const [task, setTask] = useState({} as TTask);
  const listarchives = listTaks.filter(t => t.archive === true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState({} as TTask);
  const navigate = useNavigate();
  const userLogged = useAppSelector(state => state.userLogged.userLogged.email);

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, []);

  function page() {
    setArchive(!archive);
  }
  useEffect(() => {
    console.log(archive);
  }, [archive]);

  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const actionConfirm = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const openModalImput = () => {
    setOpenAdd(true);
  };

  const openModalEdit = (task: TTask) => {
    setTask(task);
    setOpenEdit(true);
  };

  const taskarchive = (id: number) => {
    dispatch(taskArchiveAsyncThunk({ id: id, email: userLogged }));
    setTimeout(() => {
      dispatch(getTaskAsyncThunk(userLogged));
    }, 200);
  };

  const openModalDelete = (item: TTask) => {
    console.log(item);
    setSelectedTask(item);
    setOpenDelete(true);
  };

  return (
    <Grid container height={'100vh'} display="flex" justifyContent="center">
      <Grid item sm={12} height="100%">
        <Box height="100%" paddingX={4} bgcolor="#fafafa"  boxShadow={4}>
          <Typography paddingY={2} variant="h4">
            {archive ? 'Recados Arquivados' : 'Todos os recados'}
          </Typography>
          <Grid item>
            {archive
              ? listarchives.map(Task => (
                <Grid item key={Task?.id}>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="edit" sx={{ m: 1 }} onClick={() => openModalEdit(Task)}>
                          <ModeEditIcon color="secondary" />
                        </IconButton>
                        <IconButton
                          onClick={() => openModalDelete(Task)}
                          edge="end"
                          aria-label="delete"
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <IconButton onClick={() => taskarchive(Task.id)}>
                        <BookmarkIcon color="primary" />
                      </IconButton>
                    </ListItemAvatar>
                    <ListItemText primary={Task.title} secondary={Task.description} />
                  </ListItem>
                </Grid>
              ))
              : listTaks.map(Task => (
                <Grid item key={Task?.id}>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="edit" sx={{ m: 1 }} onClick={() => openModalEdit(Task)}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => openModalDelete(Task)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <IconButton onClick={() => taskarchive(Task.id)}>
                        {Task.archive ? (
                          <>
                            <BookmarkIcon color="primary" />
                          </>
                        ) : (
                          <>
                            <BookmarkBorderIcon color="primary" />
                          </>
                        )}
                      </IconButton>
                    </ListItemAvatar>
                    <ListItemText primary={Task.title} secondary={Task.description} />
                  </ListItem>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
      <Typography
        sx={{
          position: 'absolute',
          bottom: '20px'
        }}
        variant="h5"
      >
        {archive ? (
          <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <IconButton color="primary" onClick={page}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography>Todos os recados</Typography>
          </Grid>
        ) : (
          <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography>Arquivados</Typography>
            <IconButton color="primary" onClick={page}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        )}
      </Typography>
      <Fab
        onClick={openModalImput}
        color="info"
        aria-label="add"
        sx={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          bgcolor: '#C891B4'
        }}
      >
        <AddIcon />
      </Fab>
      <ModalInputs openModal={openAdd} actionConfirm={actionConfirm} actionCancel={handleClose} />
      {openEdit && (
        <ModalEdit
          taskEdit={task}
          openModal={openEdit}
          actionCancel={handleClose}
          actionConfirm={actionConfirm}
        ></ModalEdit>
      )}
      <ModalDelete
        deleteTask={selectedTask}
        openModal={openDelete}
        actionCancel={handleClose}
        actionConfirm={actionConfirm}
      />
    </Grid>
  );
};

export default Notes;
