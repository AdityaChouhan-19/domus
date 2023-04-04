import React from 'react'
import { useQuery } from 'react-query'
import { getPostings } from '../../../api/post'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from './HomePage.module.css';
import { Post } from '../../Post/Post.js';

export default function HomePage(){
  const { isLoading, error, data } = useQuery('postings', getPostings)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  console.log(data);

  const postings = data?.map((post) =>
    <>
      {
        <Post post={post} key={post._id}></Post>
      }
    </>  
  );

  return (
    <div className={styles.postingsContainer}>
      {postings}
    </div>
  )
}