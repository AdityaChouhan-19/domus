import { createAsyncThunk, configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'

import axios from 'axios'
import {API_URL} from '../config/config.js';


export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await axios.get(API_URL + '/api/users/auth');
    return response.data;
  }
);



let user = createSlice({
  name : 'user',
  initialState : {
    isAuth: true,
    error: false
  },
  reducers : {
    async auth(state){
      let data = null;
        const request = await axios.get(API_URL + '/api/users/auth')
        .then(response => {
          return response.data;
        })
        

      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state = action.payload;
        console.log(action)
      })
      .addCase(fetchUserData.rejected, (state, action) => {

      });
  },
})


let login = createSlice({
  
    name : 'login',
    initialState : {
      loginSuccess: true,
      userId: 'aaa'
    },
    reducers : {
      async loginUser(state, action){
        let data = null;
          const request = await axios.post(API_URL + '/api/users/login', action.payload)
          .then(response => {
            return response.data;
          })
          
  
        
      }
    },
  }
)

export let {auth} = user.actions;
export let {loginUser} = login.actions;

export default configureStore({
  reducer: { 
    user : user.reducer,
    login : login.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
}) 