import React, { useEffect, useState } from 'react'
import { auth } from '../../../api/auth'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { API_URL } from '../../../config/config';
import { Post } from '../../Post/Post';

import styles from './SavedPostingPage.module.css';
import { getSavedList } from '../../../api/user.js';

export default function SavedPostingPage(){

    const client = useQueryClient();
    const auth = client.getQueryData('auth');
    const redirect = useNavigate();

    const [savedList, setSavedList] = useState('');

    let postings = '';

    useEffect(()=>{
        if(!auth?.isAuth) return redirect('/login');
        //console.log('refetched!!!!');

        
        Axios.get(API_URL + "/api/users/savedlist", { withCredentials: true }).then((res) => {
            setSavedList(res.data);
            console.log(savedList);
        });
        
    }, [auth])

    

    if(!auth?.isAuth) return redirect('/login')

    if(savedList){
        console.log('asdf');
        console.log(savedList.result);
        postings = savedList && savedList.result.length > 0 ? savedList.result?.map((post) =>
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
            <div className={styles.postingsContainer}>
                {savedList ? postings : 'empty'}
            </div>
        </>
    )
}
