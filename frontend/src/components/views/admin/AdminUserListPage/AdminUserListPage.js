/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './AdminUserListPage.module.css';
import { getUsers } from '../../../../api/admin';
import AdminNavBar from '../AdminNavBar/AdminNavBar.js';
import AdminUserCard from '../AdminUserCard/AdminUserCard';

export default function AdminHomePage(){


    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    const redirect = useNavigate();

    const [searchEmail, setSearchEmail] = useState('');

    const onChangeSearchEmail = (event) => {
        setSearchEmail(event.target.value);
    }

    useEffect(()=>{
        if(!auth?.isAuth || !auth?.isAdmin) return redirect('/');

    })

    const { isLoading, error, data, refetch } = useQuery('users', ()=>{
        
        return getUsers(searchEmail);
    })
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    const onClickUserSearchBtn = async () => {
        refetch();
    }

    return (
        <>
            <AdminNavBar></AdminNavBar>
            <h1>User List</h1>
            <div className={styles.adminSearchBarContainer}>
                <TextField onChange={onChangeSearchEmail} value={searchEmail} style={{backgroundColor: 'snow', width: '500px', borderRadius: '10px'}} type="text"></TextField>
                <Button onClick={onClickUserSearchBtn} style={{backgroundColor: 'snow', color: '#4747f5', marginLeft: '15px', borderRadius: '10px'}}>Search</Button>
            </div>
            <div className={styles.userContainerHeader}>
                <div className={styles.userCardHeader}>
                    <div className={styles.cardItemHeader}>First Name</div>
                    <div className={styles.cardItemHeader}>Last Name</div>
                    <div className={styles.cardItemHeader}>Email</div>
                    <div className={styles.cardItemHeader}>Online</div>
                    <div className={styles.cardItemHeader}>Status</div>
                    <div className={styles.cardItemHeader}>Button</div>
                </div>
            </div>
            <div className={styles.userListContainer}>
                {
                    data?.map((user)=>{
                        return <>
                            <AdminUserCard refetch={refetch} user={user}/>
                        </>
                    })
                }
            </div>
        </>
    )
}
