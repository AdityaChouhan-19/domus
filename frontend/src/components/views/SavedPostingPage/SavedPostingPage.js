/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect, useState } from 'react'

import { useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { API_URL } from '../../../config/config';
import { Post } from '../../Post/Post';

import styles from './SavedPostingPage.module.css';

export default function SavedPostingPage(){

    const client = useQueryClient();
    const auth = client.getQueryData('auth');
    const redirect = useNavigate();

    const [savedList, setSavedList] = useState('');

    let postings = '';

    useEffect(()=>{
        if(!auth?.isAuth) return redirect('/login');
        
        Axios.get(API_URL + "/api/users/savedlist", { withCredentials: true }).then((res) => {
            setSavedList(res.data);

        });
        
    }, [auth])

    

    if(!auth?.isAuth) return redirect('/login')

    if(savedList){
        postings = savedList && savedList.result.length > 0 ? savedList.result?.map((post) =>
            <>
            {
                <Post post={post} key={post._id}></Post>
            }
            </>  
        )
        : <div></div>;
    }


    return (
        <>
            <h1>Saved List</h1>
            <div className={styles.postingsContainer}>
                {savedList ? postings : ''}
            </div>
        </>
    )
}
