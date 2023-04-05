import Axios from 'axios'
import { API_URL } from '../config/config';

export const getPostings = async () => {
    const { data } = await Axios.get(API_URL + "/api/post", { withCredentials: true });

    return data;
};

export const getPost = async (id) => {
    const { data } = await Axios.get(API_URL + "/api/post/" + id, { withCredentials: true });

    return data;
};

export const getMyPosting = async () => {
    const { data } = await Axios.get(API_URL + "/api/post/myposting", { withCredentials: true });

    return data;
};
