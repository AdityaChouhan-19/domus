/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React from 'react'
import Axios from 'axios'

import styles from './AdminUserCard.module.css';
import { Button } from '@mui/material';
import { API_URL } from '../../../../config/config';
import { useQueryClient } from 'react-query';

export default function AdminUserCard(props){
    const client = useQueryClient();
    const auth = client.getQueryData('auth');


    const onClickBanUserBtn = async (event) => {
        const body = props.user;
        Axios.put(API_URL + '/api/admin/banuser/' + props.user._id, body, { withCredentials: true }).then((res) => {

            props.refetch();
        })
    }

    const onClickReleaseUserBtn = async (event) => {
        const body = props.user;
        Axios.put(API_URL + '/api/admin/banuser/' + props.user._id, body, { withCredentials: true }).then((res) => {

            props.refetch();
        })
    }
  return (
    <>
        <div className={styles.userCard} style={
            { backgroundColor : props.user.token === '' ? '#F15A59' : '#27E1C1'
            }
            }>
            <div className={styles.cardItem}>{props.user.firstname}</div>
            <div className={styles.cardItem}>{props.user.lastname}</div>
            <div className={styles.cardItem}>{props.user.email}</div>
            <div className={styles.cardItem}>{props.user.token === '' ? 'OFF' : 'ON'}</div>
            <div className={styles.cardItem}>{props.user.isBanned === 'N' ? 'Unlocked' : 'Locked'}</div>
            <div className={styles.cardItem}>{props.user.isBanned === 'N' ? 
                <Button style={{backgroundColor: 'red', color: 'snow'}} className={styles.banUserBtn} onClick={onClickBanUserBtn}>Ban</Button>
                :
                <Button style={{backgroundColor: '#4747f5', color: 'snow'}} className={styles.releaseUserBtn} onClick={onClickReleaseUserBtn}>Release</Button>
            }</div>
        </div>
    </>
  )
}
