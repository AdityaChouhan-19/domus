/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import Axios from 'axios'
import { API_URL } from '../config/config';

export const getPostings = async () => {

    const { data } = await Axios.get(API_URL + "/api/post", { withCredentials: true });
    return data;
    
};

export const getFilteredPostings = async (dataToSend) => {

    const { data } = await Axios.get(API_URL + "/api/post?nearby=" + dataToSend.nearby 
    + "&distance=" + dataToSend.distance 
    + "&minPrice=" + dataToSend.minPrice 
    + "&maxPrice=" + dataToSend.maxPrice, { withCredentials: true });
    return data;
    
};


export const getMyPosting = async () => {
    const { data } = await Axios.get(API_URL + "/api/post/myposting", { withCredentials: true });

    return data;
};


