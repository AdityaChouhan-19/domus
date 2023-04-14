/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/14/2023
algorithm explanation added.
*/

import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'
import {API_URL} from './../../../config/config.js';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from './PostingDetailPage.module.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function PostingDetailPage(){
    const redirect = useNavigate();
    const client = useQueryClient();
    const auth = client.getQueryData('auth');

    let { id } = useParams();
    const [myInfo, setMyInfo] = useState('');
    const [data, setData] = useState('');

    const [savedBtnToggle, setSavedBtnToggle] = useState(false);

    const [comment, setComment] = useState('');

    const [commentRefetch, setCommentRefetch] = useState(false);

    const onChangeComment = (event)=>{
        setComment(event.target.value);
    }

    useEffect(()=>{
        //fetch postiing detail info
        Axios.get(API_URL + "/api/post/" + id, { withCredentials: true }).then((response) => {
            
            setData(response.data)
            if(response.data.isSoldOut !== 'N' && auth.isAdmin === false){
                redirect('/');
            }
            //fetch user info
            Axios.get(API_URL + "/api/users/myinfo", { withCredentials: true }).then((res) => {
                
                setMyInfo(res.data)
    
                if(res.data?.user?.savedList?.includes(response.data?._id)){
                    
                    setSavedBtnToggle(true);

                }else{
                    setSavedBtnToggle(false);
                    
                }
            });
        });

    }, [savedBtnToggle, commentRefetch])


    

    const onClickSavedBtnOnHandler = async () => {
        if(!auth.isAuth){
            return alert('Please Login to Save It');
        }
        let copy = {...myInfo};
        copy.user.savedList.push(data._id)
        //update the savedList data
        Axios.put(API_URL + "/api/users/savepostingonoff", copy.user.savedList, { withCredentials: true }).then((res) => {
            
            setMyInfo(res.data)
            setSavedBtnToggle(true);
        });
    }

    const onClickSavedBtnOffHandler = async () => {
        //block guest user's action
        if(!auth.isAuth){
            return alert('Please Login to Save It');
        }
        let copy = {...myInfo};
        
        const index = copy.user.savedList.indexOf(data._id);

        if (index > -1) {
            copy.user.savedList.splice(index, 1);
        }
        
        Axios.put(API_URL + "/api/users/savepostingonoff", copy.user.savedList, { withCredentials: true }).then((res) => {
            
            setMyInfo(res.data)
            setSavedBtnToggle(false);
        });
    }

    const onClickReportBtnOnHandler = async () => {
        //block guest user's action
        if(!auth.isAuth){
            return alert('Please Login to Report It');
        }
        try{
            Axios.put(`${API_URL}/api/post/report/${data._id}`,{}, { withCredentials: true }).then((res) => {
                
                alert('This posting has been reported!');
            });   
        }catch(err){
            alert(err.message);
        }
    }

    const onClickReleaseBtn = async () => {
        Axios.put(`${API_URL}/api/admin/releaseposting/${data._id}`,{}, { withCredentials: true }).then((res)=>{
            
            alert('This posting has been released!');
            redirect('/admin/reportedlist');
        });

    }

    const onClickBanBtn = async () => {
        Axios.put(`${API_URL}/api/admin/banposting/${data._id}`,{}, { withCredentials: true }).then((res)=>{
            
            alert('This posting has been banned!');
            redirect('/admin/reportedlist');
        });
    }

    const onClickCommentBtn = async () => {
        if(comment === ''){
            return
        }
        if(!auth.isAuth){
            return alert('Please Login to Write It');
        }
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const currentDate = `${year}-${month}-${day}`;
        
        
        let body = {
            writerId: auth._id,
            writerName: auth.firstname,
            content: comment,
            time: currentDate
        }
        Axios.put(`${API_URL}/api/post/comment/${data._id}`,body, { withCredentials: true }).then((res)=>{
            
            setComment('');
            setCommentRefetch(!commentRefetch);
            
        });
    }

    const onClickEditBtn = () => {
        redirect('/post/edit/' + data._id);
    }


    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const commentList = data?.comments?.map((comment) =>
        <>
        {
            <div style={{border: '1px solid blue'
            , padding: '10px'
            , paddingLeft: '50px'
            , borderRadius: '10px'
            , margin: '10px'
            , boxShadow: '0px 3px 10px blue'
            , marginBottom: '20px'
            }}>
                <div>{comment.writerName} : {comment.content}</div>
                <div>{comment.time}</div>
            </div>
        }
        </>  
    );
    

    return (
        <>
            <CssBaseline />
            <Container className={styles.postingDetailContainer} maxWidth="md">
                <Box sx={{ bgcolor: 'snow', height: '75vh' }} className={styles.detailBox}>
                    <div className={styles.contentBox}>
                        <img className={styles.coverImg} src={API_URL + data.cover} ></img>
                        <ReportIcon onClick={onClickReportBtnOnHandler} className={styles.reportBtn} style={{width: '40px', height: '40px'}}/>

                        {
                            savedBtnToggle ? 
                            <FavoriteIcon onClick={onClickSavedBtnOffHandler} className={styles.savedBtn} style={{width: '40px', height: '40px'}}/>
                            :
                            <FavoriteBorderIcon onClick={onClickSavedBtnOnHandler} className={styles.savedBtn} style={{width: '40px', height: '40px'}}/>
                        }
                        {
                            auth?._id === data?.author?._id ? 
                            <ModeEditOutlineIcon onClick={onClickEditBtn} className={styles.editBtn} style={{width: '40px', height: '40px'}}/> 
                            : 
                            ''
                        }
                        
                        <div className={styles.content}>
                            <div>Price : ${data.price}</div>
                            <div>Summary : {data.summary}</div>
                            <div>Content : {data.content}</div>
                        </div>
                    </div>
                    <div className={styles.locationInfoBox}>
                        <div>Nearby : {data.nearBy}</div>
                        <div>Distance : {data.distance}km</div>
                        <Button style={{padding: '5px', marginTop: '40px', width: '80%', backgroundColor: '#4747f5', color: 'snow'}} onClick={handleOpen}>Contact Info</Button>
                        {
                            auth?.isAdmin ? 
                            <>
                                <Button style={{marginRight: '5px', marginTop: '40px', backgroundColor: '#FC2947', color: 'snow'}} onClick={onClickBanBtn}>Ban</Button>
                                <Button style={{marginTop: '40px', backgroundColor: '#27E1C1', color: 'snow'}} onClick={onClickReleaseBtn}>Release</Button>
                            </>
                            :
                            <></>
                        }
                    </div>
                </Box>
                <div className={styles.commentBox}>
                    <input onChange={onChangeComment} value={comment} className={styles.commentInput} type='text'></input>
                    <Button onClick={onClickCommentBtn} style={{border: '1px solid blue'}} className={styles.commentBtn}>Enter</Button>
                </div>
                <div>
                    {
                        data && commentList
                    }
                </div>
                
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                        Email
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {data.authorEmail}
                        </Typography>
                    </Box>
                    </Fade>
                </Modal>
            </Container>
        </>
    )
}
