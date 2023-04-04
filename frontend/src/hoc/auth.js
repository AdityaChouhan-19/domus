import React, { useEffect } from 'react';
import Axios from 'axios'
import {API_URL} from './../config/config.js';
import { useQuery } from 'react-query'

export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  pages for anyone
    //true    =>  pages only for login users
    //false   =>  pages that login users can't enter
    function AuthenticationCheck(props) {
        const { isLoading, error, data } = useQuery('auth', () =>
            Axios.get(API_URL + '/api/users/auth', { withCredentials: true }).then(res => res.data)
        )

        console.log('aaa')

        if (!data.isAuth) {
            if (option) {
                props.history.push('/login')
            }
        } else {
            //login
            if (adminRoute && !data.isAdmin) {
                props.history.push('/')
            } else {
                if (option === false)
                    props.history.push('/')
            }
        }

        
        return (
            <SpecificComponent />
        )

        
    }
    return AuthenticationCheck
}