import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';


import { Button } from '@mui/material';


import styles from './AdminReportedListPage.module.css';

export default function AdminReportedListPage(){
    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    const redirect = useNavigate();

    useEffect(()=>{
        if(!auth?.isAuth || !auth?.isAdmin) return redirect('/')


    })
  return (
    <>
        <div className={styles.searchContainer}>
            <Button onClick={()=>{redirect('/admin')}} style={{color: 'blue', backgroundColor: 'snow'}}>Home</Button>
            <Button onClick={()=>{redirect('/admin/reportedlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>Reported Posting</Button>
        </div>
        <div>
            Reported List Page
        </div>
    </>
  )
}
