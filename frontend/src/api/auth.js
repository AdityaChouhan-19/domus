/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import Axios from 'axios'
import { API_URL } from '../config/config';
export const auth = async () => {
    const { data } = await Axios.get(API_URL + "/api/users/auth", { withCredentials: true });

    return data;
};



