/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';


import AdminNavBar from '../AdminNavBar/AdminNavBar.js';

import styles from './AdminBannedListPage.module.css';
import { getBannedPostings } from '../../../../api/admin';
import { Post } from '../../../Post/Post';

export default function AdminBannedListPage(){
    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    const redirect = useNavigate();

    const { isLoading, error, data, refetch } = useQuery('bannedPostings', getBannedPostings);


    useEffect(()=>{
        if(!auth?.isAuth || !auth?.isAdmin) return redirect('/')

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
        <AdminNavBar></AdminNavBar>
        <h1>Banned Postings</h1>
        <div className={styles.postingsContainer}>
            {
                data && postings
            }
        </div>
    </>
  )
}
