import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getPost } from '../../../api/post'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import {API_URL} from './../../../config/config.js';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import styles from './PostingDetailPage.module.css';

// const getPost = async (id) => {
//     const { data } = await Axios.get(API_URL + "/api/post/" + id, { withCredentials: true });

//     return data;
// };

export default function PostingDetailPage(){
    let { id } = useParams();
    const [data, setData] = useState('');

    useEffect(()=>{
        Axios.get(API_URL + "/api/post/" + id, { withCredentials: true }).then((res) => {
            console.log(res.data);
            setData(res.data)
        });

    })

    
    // useEffect(()=>{
    //     data = refetch();
    // }, []);
    
    // let { isLoading, error, data, refetch } = useQuery('detail', async () => {getPost(id)})
    // console.log(data)
    // console.log('checkkkk')
    // if (isLoading) return 'Loading...'
    // if (error) return 'An error has occurred: ' + error.message
    // console.log(data)
    // console.log('checkkkk111')

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ bgcolor: 'snow', height: '75vh' }} className={styles.detailBox}>
                    <div className={styles.contentBox}>
                        <img className={styles.coverImg} src={API_URL + data.cover} ></img>
                        <div className={styles.content}>
                            <div>Price : ${data.price}</div>
                            <div>Summary : {data.summary}</div>
                            <div>Content : {data.content}</div>
                        </div>
                    </div>
                    <div className={styles.locationInfoBox}>
                        <div>Nearby : {data.nearBy}</div>
                        <div>Distance : {data.distance}km</div>
                    </div>
                </Box>
            </Container>
        </>
    )
}
