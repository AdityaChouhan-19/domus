import Axios from 'axios'
import { API_URL } from '../config/config';

export const getSavedList = async () => {
    const { data } = await Axios.get(API_URL + "/api/users/savedlist", { withCredentials: true });

    return data;
};

export const getMyInfo = async () => {
    const { data } = await Axios.get(API_URL + "/api/users/myinfo", { withCredentials: true });

    return data;
};