import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from '../../../../api/auth';
import { useQuery } from 'react-query';

export default function AdminHomePage(){

    const redirect = useNavigate();
    const { isLoading, error, data, refetch } = useQuery('auth', auth)

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if(!data.isAuth || !data.isAdmin) return redirect('/')

    return (
        <h1>AdminHomePage</h1>
    )
}
