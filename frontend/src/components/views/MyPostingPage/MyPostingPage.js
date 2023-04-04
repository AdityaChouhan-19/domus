import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../api/auth';
import { getMyPosting } from '../../../api/post';
import { Post } from '../../Post/Post';
import Button from '@mui/material/Button';

import styles from './MyPostingPage.module.css';

export const MyPostingPage = () => {
    const client = useQueryClient();
    const auth = client.getQueryData('auth');
    const redirect = useNavigate();

    let postings = () => {<div>Empty</div>};
    
    const { isLoading, error, data } = useQuery('myPosting', getMyPosting)
    useEffect(()=>{
        if(!auth?.isAuth) return redirect('/login');
        if(data){
          postings = data && data.length > 0 ? data?.map((post) =>
            <>
              {
                <Post post={post} key={post._id}></Post>
              }
            </>  
          ) : <div>empty</div>;
        }
    }, [auth, data])

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message


    //console.log(data);
    if(!auth?.isAuth) return redirect('/login')


    if(data){
      postings = data && data.length > 0 ? data?.map((post) =>
        <>
          {
            <Post post={post} key={post._id}></Post>
          }
        </>  
      )
      : <div>empty</div>;
    }

  return (
    <>
      <Button className={styles.newBtn} variant="contained" onClick={()=>{redirect('/createposting')}}>New</Button>
      <div className={styles.postingsContainer}>
        {data ? postings : ''}
      </div>
    </>
  )
}
