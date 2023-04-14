/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/14/2023
algorithm explanation added.
*/

import React, { useState } from 'react'

import { useQuery } from 'react-query'
import {auth} from '../../../api/auth.js';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from './CreatePostingPage.module.css';
import { API_URL } from '../../../config/config.js';


export default function CreatePostingPage(){
    const redirect = useNavigate();
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

        //validation check
        if(nearBy === ''){
            return
        }
        if(distance <= 0){
            return
        }
        if(title === ''){
            return
        }
        if(summary === ''){
            return
        }
        if(content === ''){
            return
        }
        if(price <= 0){
            return
        }
        if(files === '' || files === null){
            return
        }

        const newData = new FormData();
        newData.set('nearBy', nearBy);
        newData.set('distance', distance);
        newData.set('title', title);
        newData.set('summary', summary);
        newData.set('content', content);
        newData.set('price', price);
        newData.set('authorEmail', data.email);
        newData.set('file', files[0]);


        //Insert data in db
        Axios.post(API_URL + '/api/post', newData, { withCredentials: true }).then((res) => {

            redirect('/myposting');
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }
    

    //get auth info 
    const { isLoading, error, data } = useQuery('auth', auth)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if(!data.isAuth) return redirect('/')
  return (
    <>
        <div>
            <div className={styles.title}>New Posting</div>
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
    </>
  )
}
