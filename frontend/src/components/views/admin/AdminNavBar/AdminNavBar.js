/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React from 'react'

import styles from './AdminNavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AdminNavBar(){

    const redirect = useNavigate();

  return (
    <>
        <div className={styles.searchContainer}>
            <Button onClick={()=>{redirect('/admin/userlist')}} style={{color: 'blue', backgroundColor: 'snow', marginRight: '20px'}}>User List</Button>
            <Button onClick={()=>{redirect('/admin/reportedlist')}} style={{color: 'blue', backgroundColor: 'snow', marginRight: '20px'}}>Reported Postings</Button>
            <Button onClick={()=>{redirect('/admin/bannedlist')}} style={{color: 'blue', backgroundColor: 'snow', marginRight: '20px'}}>Banned Postings</Button>
        </div>
    </>
  )
}
