import React from 'react'
import { useQuery } from 'react-query'
import { getPost } from '../../../api/post'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import {API_URL} from './../../../config/config.js';

// const getPost = async (id) => {
//     const { data } = await Axios.get(API_URL + "/api/post/" + id, { withCredentials: true });

//     return data;
// };

export default function PostingDetailPage(){
    let { id } = useParams();

    const { isLoading, error, data } = useQuery('detail', getPost(id))
    console.log(data)
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    console.log(data)

    

    return (
        <div>{data.title}</div>
    )
}
