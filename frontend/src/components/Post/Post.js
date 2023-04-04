import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from './Post.module.css';

export const Post = (props) => {
  console.log(props.post)
  return (
    <>
        <Card className={styles.postCard} sx={{ maxWidth: 345 }}>
            <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
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
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </>
  )
}
