/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../../config/config';
import Axios from 'axios';

export default function MyProfilePage(){
    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    const redirect = useNavigate();

    const [myInfo, setMyInfo] = useState('');

    useEffect(()=>{
        Axios.get(API_URL + "/api/users/myinfo", { withCredentials: true }).then((res) => {
            setMyInfo(res.data)
        });
    }, [])


    const { isLoading, error, data, refetch } = useQuery('auth', auth)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message


    if(!auth.isAuth) return redirect('/login')

    return (
        <>
            <h1>{myInfo?.user?.email}</h1>
            <div>{myInfo?.user?.firstname}</div>
            <div>{myInfo?.user?.lastname}</div>
        </>
    )
}
