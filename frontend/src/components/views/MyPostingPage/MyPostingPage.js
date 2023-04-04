import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../api/auth';
import { getMyPosting } from '../../../api/post';
import { Post } from '../../Post/Post';
import styles from './MyPostingPage.module.css';

export const MyPostingPage = () => {
    const client = useQueryClient();
    const auth = client.getQueryData('auth');
    const redirect = useNavigate();
    
    //const { isLoading, error, data } = useQuery('auth', auth)
    const { isLoading, error, data } = useQuery('myPosting', getMyPosting)
    useEffect(()=>{
        if(!auth?.isAuth) return redirect('/login')
    }, [auth, data])

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    //if(myPostingIsLoading) return 'Loading...'
    //if (myPostingError) return 'An error has occurred: ' + myPostingError.message

    //console.log(data);
    if(!auth?.isAuth) return redirect('/login')

    const postings = data?.map((post) =>
    <>
      {
        <Post post={post} key={post._id}></Post>
      }
    </>  
  );

  return (
    <div className={styles.postingsContainer}>
      {postings}
    </div>
  )
}
