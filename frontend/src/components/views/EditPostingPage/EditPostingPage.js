/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'
import {API_URL} from './../../../config/config.js';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from './EditPostingPage.module.css';
import { useQuery } from 'react-query';
import { auth } from '../../../api/auth.js';

export default function EditPostingPage(){
    const redirect = useNavigate();
    let { id } = useParams();


    useEffect(()=>{
        Axios.get(API_URL + "/api/post/" + id, { withCredentials: true }).then((response) => {

            let prevData = response.data;
            setNearBy(prevData.nearBy);
            setDistance(prevData.distance);
            setTitle(prevData.title);
            setSummary(prevData.summary);
            setContent(prevData.content);
            setPrice(prevData.price);
        })
            
    }, [])

    const [nearBy, setNearBy] = useState('');
    const [distance, setDistance] = useState(0);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState(0);
    const [files, setFiles] = useState('');

    const onNearByHandler = (event) => {
        setNearBy(event.target.value);
    };

    const onDistanceHandler = (event) => {
        setDistance(event.currentTarget.value)
    }

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onSummaryHandler = (event) => {
        setSummary(event.currentTarget.value)
    }

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value)
    }

    const onPriceHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const onFilesHandler = (event) => {
        setFiles(event.currentTarget.files)
    }

    const onSubmitHandler = async (event) => {
        const newData = new FormData();
        newData.set('nearBy', nearBy);
        newData.set('distance', distance);
        newData.set('title', title);
        newData.set('summary', summary);
        newData.set('content', content);
        newData.set('price', price);
        newData.set('file', files[0]);


        Axios.put(API_URL + '/api/post/' + id, newData, { withCredentials: true }).then((res) => {
            alert('your posting has been updated!');
            redirect('/post/' + id);
        })
        
    }

    


    const { isLoading, error, data } = useQuery('auth', auth)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if(!data.isAuth) return redirect('/')

  return (
    <div>
        <div>
        <h1 className={styles.title}>Edit Posting</h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className={styles.formTag}
            >
                <FormControl className={styles.formContainer} fullWidth>
                    <InputLabel id="demo-simple-select-label">Near By</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nearBy}
                    label="Near By"
                    onChange={onNearByHandler}
                    >
                        <MenuItem value={'Centennial College'}>Centennial College</MenuItem>
                        <MenuItem value={'Seneca College'}>Seneca College</MenuItem>
                        <MenuItem value={'Humber College'}>Humber College</MenuItem>
                    </Select>

                    <TextField type="number" id="outlined-basic" label="Distance (km)" variant="outlined"
                        onChange={onDistanceHandler} value={distance}
                    />

                    <TextField id="outlined-basic" label="Title" variant="outlined"
                        onChange={onTitleHandler} value={title}
                    />
                    <TextField id="outlined-basic" label="Summary" variant="outlined"
                        onChange={onSummaryHandler} value={summary}
                    />
                    <TextField id="outlined-basic" label="Content" variant="outlined"
                        onChange={onContentHandler} value={content}
                    />
                    <TextField type="number" id="outlined-basic" label="Price $" variant="outlined"
                        onChange={onPriceHandler} value={price}
                    />
                    <TextField type="file" id="outlined-basic" label="Photo" variant="outlined"
                        onChange={onFilesHandler}
                    />

                    <Button onClick={onSubmitHandler} variant="contained" size="large">
                        Submit
                    </Button>
                </FormControl>
            </Box>
        </div>
    </div>
  )
}
