
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "./../../../store/store.js";
import { API_URL } from '../../../config/config.js';
import { useQuery, useQueryClient } from 'react-query'
import {auth, login} from '../../../api/auth.js';

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

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        

        await Axios.post(API_URL + '/api/users/login', body, { withCredentials: true }).then((res) => {
            console.log(res.data)
            localStorage.setItem('loginInfo', JSON.stringify(res.data));
            setLoginInfo(res.data.userId);
            return redirect('/')
        })

    }

    const { isLoading, error, data } = useQuery('auth', auth)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if(data.isAuth) return redirect('/')


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
                
            </form>
        </div>
    )
}