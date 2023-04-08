import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import { API_URL } from '../../config/config';
import { useQuery, useQueryClient } from 'react-query';
import Axios from 'axios';
import { auth } from '../../api/auth';

export const Post = (props) => {
  const { isLoading, error, data, refetch } = useQuery('auth', auth)

  //Only MyPostingPage props can bring author Object
  //other pages bring string value for author
  console.log("Heree" + props.post.author)
  //console.log(props.auth)
  console.log(API_URL + props.post.cover)
  const redirect = useNavigate();
  
  const onClickHandler = (event)=>{
    if(event.target.id !== 'soldOutBtn' && data.isAdmin === true){
      redirect('/post/' + props.post._id);
    }
    if(event.target.id === 'soldOutBtn' || props.post.isSoldOut !== 'N'){
      return
    }
    redirect('/post/' + props.post._id);
  }

  const onClickSoldOutBtn = (event) => {
    if(event.target.id === 'soldOutBtn'){
      console.log('btn pushed')
      Axios.put(API_URL + "/api/post/keepphoto/" + props.post._id, {}, { withCredentials: true }).then((res) => {
        console.log(res.data);
        props.refetch();
      });
    }
  }

  const soldOut = {opacity: 0.4};
  const open = {opacity: 1};

  const style = props.post.isSoldOut !== 'N' ? soldOut : open;

  return (
    <>
        <Card onClick={onClickHandler} style={style} className={styles.postCard} sx={{ maxWidth: 345 }}>
            <CardMedia
            sx={{ height: 140 }}
            image={API_URL + props.post.cover}
            title="green iguana"
            />
            
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.post.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.post.summary}
            </Typography>
            </CardContent>
            <CardActions>
            {/* <Button size="small">Share</Button> */}
            {
              data?.isAuth && data?._id === props.post.author._id && props.post.isSoldOut === 'N' ?
              <Button onClick={onClickSoldOutBtn} id="soldOutBtn" size="small">Sold Out</Button>
              :
              <></>
            }
            {
              data?.isAuth && data?._id === props.post.author._id && props.post.isSoldOut !== 'N' ?
              <Button onClick={onClickSoldOutBtn} style={{opacity: 1}} className={styles.openBtn} id="soldOutBtn" size="small">Open</Button>
              :
              <></>
            }
            </CardActions>
        </Card>
    </>
  )
}
