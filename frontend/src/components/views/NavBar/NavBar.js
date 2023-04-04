import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
//import { auth, fetchUserData } from "./../../../store/store.js";
import Axios from 'axios'
import {API_URL} from './../../../config/config.js';
import { useQuery, useQueryClient } from 'react-query'
import { auth } from '../../../api/auth.js';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import styles from './Navbar.module.css';

export default function NavBar(props){

  const redirect = useNavigate();
  const { isLoading, error, data } = useQuery('auth', auth)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const onClickLogout = () => {

    try{
      Axios.get(API_URL + '/api/users/logout', { withCredentials: true }).then((res) => {
        console.log(res.data)
        redirect('/login');
      })
    }catch(e){
      console.log(e);
    }
    
  }



  


  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.logo} onClick={()=>{redirect('/')}}>
            Domus
        </div>
        <div className={styles.menuContainer}>
          <div className={styles.menuItem} onClick={()=>{redirect('/')}}>Home</div>
          <div className={styles.menuItem}>My Profile</div>
          <div className={styles.menuItem}>Saved</div>
          <div className={styles.menuItem} onClick={()=>{redirect('/myposting')}}>My Posting</div>
        </div>
        <div className={styles.loginContainer}>
          {data.isAuth ? 
            <div className={styles.logoutBtn} onClick={onClickLogout}>Logout</div>
          :
          <>
            <div className={styles.loginBtn} onClick={()=>{redirect('/login')}}>Login</div>
            <div className={styles.registerBtn} onClick={()=>{redirect('/register')}}>Register</div>
          </>
          }
        </div>
      </div>
    </>
  )
}