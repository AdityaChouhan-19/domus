import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getPost } from '../../../api/post'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import {API_URL} from './../../../config/config.js';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './PostingDetailPage.module.css';

// const getPost = async (id) => {
//     const { data } = await Axios.get(API_URL + "/api/post/" + id, { withCredentials: true });

//     return data;
// };

export default function PostingDetailPage(){
    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    let { id } = useParams();
    const [myInfo, setMyInfo] = useState('');
    const [data, setData] = useState('');

    const [savedBtnToggle, setSavedBtnToggle] = useState(false);

    useEffect(()=>{
        Axios.get(API_URL + "/api/post/" + id, { withCredentials: true }).then((response) => {
            console.log(response.data);
            setData(response.data)

            Axios.get(API_URL + "/api/users/myinfo", { withCredentials: true }).then((res) => {
                console.log(res.data);
                setMyInfo(res.data)
    
                if(res.data?.user?.savedList?.includes(response.data?._id)){
                    //console.log('readdd');
                    setSavedBtnToggle(true);
                    // console.log(myInfo)
                    // console.log(savedBtnToggle);
                }else{
                    setSavedBtnToggle(false);
                    // console.log(myInfo)
                    // console.log(savedBtnToggle);
                }
            });
        });

    }, [savedBtnToggle])


    

    const onClickSavedBtnOnHandler = async () => {
        if(!auth.isAuth){
            return alert('Please Login to Save It');
        }
        let copy = {...myInfo};
        copy.user.savedList.push(data._id)
        Axios.put(API_URL + "/api/users/savepostingonoff", copy.user.savedList, { withCredentials: true }).then((res) => {
            console.log(res.data);
            setMyInfo(res.data)
            setSavedBtnToggle(true);
        });
    }

    const onClickSavedBtnOffHandler = async () => {
        if(!auth.isAuth){
            return alert('Please Login to Save It');
        }
        let copy = {...myInfo};
        console.log('save btn off')
        console.log(copy.user)
        const index = copy.user.savedList.indexOf(data._id);

        if (index > -1) {
            copy.user.savedList.splice(index, 1);
        }
        console.log(copy.user.savedList);
        Axios.put(API_URL + "/api/users/savepostingonoff", copy.user.savedList, { withCredentials: true }).then((res) => {
            console.log(res.data);
            setMyInfo(res.data)
            setSavedBtnToggle(false);
        });
    }
    

    

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ bgcolor: 'snow', height: '75vh' }} className={styles.detailBox}>
                    <div className={styles.contentBox}>
                        <img className={styles.coverImg} src={API_URL + data.cover} ></img>

                        {
                            savedBtnToggle ? 
                            <FavoriteIcon onClick={onClickSavedBtnOffHandler} className={styles.savedBtn}/>
                            :
                            <FavoriteBorderIcon onClick={onClickSavedBtnOnHandler} className={styles.savedBtn}/>
                        }
                        {/* <FavoriteIcon onClick={onClickSavedBtnOffHandler} className={styles.unsavedBtn}/>
                        <FavoriteBorderIcon onClick={onClickSavedBtnOnHandler} className={styles.savedBtn}/> */}
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
