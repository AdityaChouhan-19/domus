import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getFilteredPostings, getPostings } from '../../../api/post'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import styles from './HomePage.module.css';
import { Post } from '../../Post/Post.js';




export default function HomePage(){


  const [nearBy, setNearBy] = useState('');
  const [distance, setDistance] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);


  const onNearByHandler = (event) => {
    setNearBy(event.target.value);
  };
  const onDistanceHandler = (event) => {
    console.log(distance);
    if(event.target.value < 0){
      setDistance(0);
      console.log(distance);
    }else{
      setDistance(event.target.value);
      console.log(distance);
    }
  };

  const onMinPriceHandler = (event) => {
    setMinPrice(event.target.value);
  };

  const onMaxPriceHandler = (event) => {
    setMaxPrice(event.target.value);
  };

  const onClickSearchBtnHandler = async (event) => {

    if(distance == ''){
      setDistance(0);
    }
    if(minPrice == ''){
      setMinPrice(0);
    }
    if(maxPrice == ''){
      setMaxPrice(10000);
    }

    let body = {
      nearby : nearBy,
      distance : distance,
      minPrice : minPrice,
      maxPrice : maxPrice
    }

    console.log(body);
    

    console.log('refetched!');
    refetch(body);

  };

  //const { isLoading, error, data, refetch } = useQuery('postings', getFilteredPostings(body))


  const { isLoading, error, data, refetch } = useQuery('postings', ()=>{
    let body = {
      nearby : nearBy,
      distance : distance,
      minPrice : minPrice,
      maxPrice : maxPrice
    }
    return getFilteredPostings(body);
  })
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  //console.log(data);

  const postings = data?.map((post) =>
    <>
      {
        <Post post={post} key={post._id}></Post>
      }
    </>  
  );

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Box className={styles.nearbyBox} sx={{ width: 200 }}>
            <InputLabel className={styles.searchLabel} id="nearby">Near By</InputLabel>
            <Select
            labelId="nearby"
            id="nearby"
            className={styles.nearBy}
            value={nearBy}
            label="Near By"
            onChange={onNearByHandler}
            >
                <MenuItem value={'Centennial College'}>Centennial College</MenuItem>
                <MenuItem value={'Seneca College'}>Seneca College</MenuItem>
                <MenuItem value={'Humber College'}>Humber College</MenuItem>
            </Select>
            <TextField onChange={onDistanceHandler} min="0" className="no-arrows" type="number" id="outlined-basic" label="Distance" variant="outlined" />
          </Box>
          <Box className={styles.priceRangeBox}>
            <TextField onChange={onMinPriceHandler} min="0" className="no-arrows" type="number" id="outlined-basic" label="MIN" variant="outlined" />
            <TextField onChange={onMaxPriceHandler} min="0" className="no-arrows" type="number" id="outlined-basic" label="MAX" variant="outlined" />
          </Box>
          <Button onClick={onClickSearchBtnHandler} className={styles.searchBtn} variant="contained">Search</Button>
        </div>
      </div>
      <div className={styles.postingsContainer}>
        {postings}
      </div>
    </>
  )
}