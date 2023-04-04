
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "./../../../store/store.js";
import { API_URL } from '../../../config/config.js';
import { useQuery, useQueryClient } from 'react-query'
import { auth } from '../../../api/auth.js';
export default function RegisterPage(){
  const redirect = useNavigate();
  const { isLoading, error, data } = useQuery('auth', auth)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  if(data.isAuth) return redirect('/')
  
  return (
    <h1>RegisterPage</h1>
  )
}

