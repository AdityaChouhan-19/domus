/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { API_URL } from '../../../config/config.js';
import { useQuery } from 'react-query'
import {auth} from '../../../api/auth.js';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from './LoginPage.module.css';

export default function LoginPage(){
    const redirect = useNavigate();

    const [loginInfo, setLoginInfo] = useState('');

    useEffect(() => {
        localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
    }, [loginInfo])

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        Axios.post(API_URL + '/api/users/login', body, { withCredentials: true }).then((res) => {
            
            if(res.data.loginSuccess){
                localStorage.setItem('loginInfo', JSON.stringify(res.data));
                setLoginInfo(res.data.userId);
                refetch();
                redirect('/')
            }else{
                alert(res.data.message);
            }
        })
        .catch((err)=>{
            alert(err.message);
        })

    }

    const { isLoading, error, data, refetch } = useQuery('auth', auth)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if(data.isAuth) return redirect('/')


    return (
        <>
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '80vh'
        }}>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className={styles.formTag}
            >
                <TextField id="outlined-basic" label="Email" variant="outlined"
                 value={Email} onChange={onEmailHandler} 
                />
                <TextField id="outlined-basic" label="Password" variant="outlined"
                 value={Password} onChange={onPasswordHandler} type="password" 
                />
                <Button onClick={onSubmitHandler} variant="contained" size="large">
                    Login
                </Button>
            </Box>
        </div>
        </>
    )
}