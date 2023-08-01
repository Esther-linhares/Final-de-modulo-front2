import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TUser from '../../types/TypeUser';
import api from '../../service';

interface userloggedstate {
  userLogged: TUser;
}
const initialState: userloggedstate = {
  userLogged: { email: '', password: '', tasks: [] }
};

interface userLogin {
  email: string,
  password: string,
}
interface userCreate {
  email: string,
  password: string,
  repassword: string
}
interface defaultTask {
  email: string,
  id: number,
}
interface filter {
  email: string,
  title: string,
}
interface newTask {
  useremail: string,
  title: string,
  description: string
}
interface updateTask {
  id:number,
  email: string,
  title: string,
  description: string
}


export const loginAsyncThunk = createAsyncThunk('userLogin', async ({ email, password }: userLogin) => {
  const response = await api.get(`users/login/${email}/${password}`);
  return response.data;
});

export const userCreateAsyncThunk = createAsyncThunk(
  'userCreate',
  async ({ email, password, repassword }: userCreate) => {
    const response = await api.post('/users', {
      email,
      password,
      repassword
    });
    return response.data;
  });

export const taskCreateAsyncThunk = createAsyncThunk(
  'taskCreate',
  async ({ useremail, description, title }: newTask) => {
    const response = await api.post(`/tasks/${useremail}`, {
      title,
      description,
      useremail
    });
    return response.data;
  });
  
export const getTaskAsyncThunk = createAsyncThunk(
  'getTask',
  async (email: string) => {
    const response = await api.get(`/tasks/${email}`);
    return response.data;
  }); 

export const getFilterAsyncThunk = createAsyncThunk(
  'getFilter',
  async({email,title} : filter) => {
    const params = `?title=${title}`;
    const response = await api.get(`tasks/${email}/filter${params}`);
    return response.data;
  });

export const getArchiveAsyncThunk = createAsyncThunk(
  'getFilter',
  async(email : string) => {
    const params = '?achive=true';
    const response = await api.get(`tasks/${email}/filter${params}`);
    return response.data;
  });

export const taskDeleteAsyncThunk = createAsyncThunk(
  'taskDelete',
  async ({ email,id }: defaultTask) => {
    console.log(id);
    const response = await api.delete(`/tasks/${email}/${id}`);
    return response.data;
  });

export const taskUpdateAsyncThunk = createAsyncThunk(
  'taskUpdate',
  async ({ email,id,description,title }: updateTask) => {
    console.log(id);
    const response = await api.put(`/tasks/${email}/${id}`,{
      title,
      description
    });
    return response.data;
  });

export const taskArchiveAsyncThunk = createAsyncThunk(
  'taskArchive',
  async ({ email,id }: defaultTask) => {
    console.log(id);
    const response = await api.put(`/tasks/${email}/${id}/archive`);
    return response.data;
  });

export const usuarioLogadoSlice = createSlice({
  name: 'userLoggad',
  initialState,
  extraReducers(builder) {
    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.userLogged.email = action.payload.email;
      state.userLogged.password = action.payload.password;
      state.userLogged.tasks = [];
    });
    builder.addCase(getTaskAsyncThunk.fulfilled, (state, action) =>{
      state.userLogged.tasks = action.payload;
    });
    builder.addCase(getFilterAsyncThunk.fulfilled, (state, action) =>{
      state.userLogged.tasks = action.payload;
    });
    builder.addCase(taskCreateAsyncThunk.fulfilled, (state, action) => {
      state.userLogged.tasks.push(action.payload);
    });
  },
  reducers: {

    logout: () => {
      return initialState;
    },
  }
});
export default usuarioLogadoSlice.reducer;
export const { logout } = usuarioLogadoSlice.actions;