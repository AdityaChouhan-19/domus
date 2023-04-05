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

export const Post = (props) => {
  console.log(props.post)
  console.log(API_URL + props.post.cover)
  const redirect = useNavigate();
  
  const onClickHandler = ()=>{
    redirect('/post/' + props.post._id);
  }

  return (
    <>
        <Card onClick={onClickHandler} className={styles.postCard} sx={{ maxWidth: 345 }}>
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
            {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    </>
  )
}
