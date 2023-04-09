/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Axios from 'axios'
import {API_URL} from './../../../config/config.js';
import { useQuery } from 'react-query'
import { auth } from '../../../api/auth.js';

import Button from '@mui/material/Button';

import styles from './Navbar.module.css';

export default function NavBar(props){

  

  const redirect = useNavigate();
  const { isLoading, error, data, refetch } = useQuery('auth', auth)

  useEffect(()=>{
    refetch();
  }, [data])

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message


  const onClickLogout = () => {

    try{
      Axios.get(API_URL + '/api/users/logout', { withCredentials: true }).then((res) => {
 
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
          <div className={styles.menuItem} onClick={()=>{redirect('/savedposting')}} >Saved</div>
          <div className={styles.menuItem} onClick={()=>{redirect('/myposting')}}>My Posting</div>
          <div className={styles.menuItem} onClick={()=>{redirect('/myprofile')}}>My Profile</div>
          {
            data?.isAdmin ?
            <>
              <Button onClick={()=>{redirect('/admin/userlist')}}>Admin Page</Button>
            </>
            :
            ""
          }
        </div>
        <div className={styles.loginContainer}>
          
          {data?.isAuth ?
            <>
              <div className={styles.userName}>{data?.firstname}</div>
              <div className={styles.logoutBtn} onClick={onClickLogout}>Logout</div>
            </> 
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