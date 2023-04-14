/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

import { API_URL } from '../../../config/config.js';
import { useQuery } from 'react-query'
import { auth } from '../../../api/auth.js';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styles from './RegisterPage.module.css';

export default function RegisterPage(){

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [CheckPassword, setCheckPassword] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")

  const [EmailErrorMsg, setEmailErrorMsg] = useState("")
  const [PasswordErrorMsg, setPasswordErrorMsg] = useState("")
  const [CheckPasswordErrorMsg, setCheckPasswordErrorMsg] = useState("")
  const [FirstNameErrorMsg, setFirstNameErrorMsg] = useState("")
  const [LastNameErrorMsg, setLastNameErrorMsg] = useState("")

  const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onCheckPasswordHandler = (event) => {
      setCheckPassword(event.currentTarget.value)
  }

  const onFirstNameHandler = (event) => {
      setFirstName(event.currentTarget.value)
  }

  const onLastNameHandler = (event) => {
      setLastName(event.currentTarget.value)
  }

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      const re = /\S+@\S+\.\S+/;

      if(Email === "" || Email === null){
        setEmailErrorMsg("Email must be filled in.")
        return
      }else if(!re.test(Email)){
        setEmailErrorMsg("Incorrect format.")
        return
      }else{
        setEmailErrorMsg("");
      }

      if(Password === "" || Password === null || Password.length < 8){
        setPasswordErrorMsg("Password must be at least 8 letters or digits.")
        return
      }else{
        setPasswordErrorMsg("");
      } 
      
      if(Password !== CheckPassword) {
        setCheckPasswordErrorMsg("Check your password");
        return
      }else{
        setCheckPasswordErrorMsg("");
      }
      
      

      if(FirstName === "" || FirstName === null){
        setFirstNameErrorMsg("FirstName must be filled in.")
        return
      }else{
        setFirstNameErrorMsg("");
      } 

      if(LastName === "" || LastName === null){
        setLastNameErrorMsg("LastName must be filled in.")
        return
      }else{
        setLastNameErrorMsg("");
      }  

      let body = {
          email: Email,
          password: Password,
          firstname: FirstName,
          lastname: LastName
      }

      await Axios.post(API_URL + '/api/users/register', body, { withCredentials: true }).then((res) => {
          
          return redirect('/login')
      })
      .catch((err)=>{
        console.log(err);
      })

  }

  const redirect = useNavigate();
  const { isLoading, error, data } = useQuery('auth', auth)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  if(data.isAuth) return redirect('/')
  
  

  return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '70vh'
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

            <div className={styles.errorBox}>{EmailErrorMsg}</div>

            <TextField id="outlined-basic" label="Password" variant="outlined"
            value={Password} onChange={onPasswordHandler} type="password" 
            />

            <div className={styles.errorBox}>{PasswordErrorMsg}</div>

            <TextField id="outlined-basic" label="Check Password" variant="outlined"
            value={CheckPassword} onChange={onCheckPasswordHandler} type="password" 
            />

            <div className={styles.errorBox}>{CheckPasswordErrorMsg}</div>

            <TextField id="outlined-basic" label="First Name" variant="outlined"
            value={FirstName} onChange={onFirstNameHandler}
            />

            <div className={styles.errorBox}>{FirstNameErrorMsg}</div>

            <TextField id="outlined-basic" label="Last Name" variant="outlined"
            value={LastName} onChange={onLastNameHandler}
            />

            <div className={styles.errorBox}>{LastNameErrorMsg}</div>

            <Button onClick={onSubmitHandler} variant="contained" size="large">
                Sign Up
            </Button>
        </Box>
    </div>
  )
}

