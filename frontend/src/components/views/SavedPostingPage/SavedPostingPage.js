import React from 'react'
import { auth } from '../../../api/auth'
import { useQuery } from 'react-query'
import { useNavigate } from "react-router-dom";

export default function SavedPostingPage(){

    const redirect = useNavigate();
    const { isLoading, error, data, refetch } = useQuery('auth', auth)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if(!data.isAuth) return redirect('/login')

    return (
        <h1>SavedPostingPage</h1>
    )
}
