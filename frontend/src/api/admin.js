import Axios from 'axios'
import { API_URL } from '../config/config';

export const getUsers = async () => {
    const { data } = await Axios.get(API_URL + "/api/admin/users", { withCredentials: true });

    return data;
};