import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';


import { Button } from '@mui/material';


import styles from './AdminReportedListPage.module.css';
import { getReportedPostings } from '../../../../api/admin';
import { Post } from '../../../Post/Post';

export default function AdminReportedListPage(){
    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    const redirect = useNavigate();

    const { isLoading, error, data, refetch } = useQuery('reportedPostings', getReportedPostings);


    useEffect(()=>{
        if(!auth?.isAuth || !auth?.isAdmin) return redirect('/')
        console.log(data);

    })

    const postings = data?.map((post) =>
        <>
        {
            <Post post={post} key={post._id}></Post>
        }
        </>  
    );

  return (
    <>
        <div className={styles.searchContainer}>
            <Button onClick={()=>{redirect('/admin/userlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>User List</Button>
            <Button onClick={()=>{redirect('/admin/reportedlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>Reported Postings</Button>
            <Button onClick={()=>{redirect('/admin/bannedlist')}} style={{color: 'blue', backgroundColor: 'snow'}}>Banned Postings</Button>
        </div>
        <h1>Reported Postings</h1>
        <div className={styles.postingsContainer}>
            {
                data && postings
            }
        </div>
    </>
  )
}
