import { combineReducers } from '@reduxjs/toolkit';
import UserLoggedSlice from './UserLoggedSlice';
import UsersSlice from './UsersSlice';



export default combineReducers({
  userLogged: UserLoggedSlice,
  users: UsersSlice
});