/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import Axios from 'axios'
import { API_URL } from '../config/config';

export const getUsers = async () => {
    const { data } = await Axios.get(API_URL + "/api/admin/users", { withCredentials: true });

    return data;
};

export const getReportedPostings = async () => {
    const { data } = await Axios.get(API_URL + "/api/admin/reportedposting", { withCredentials: true });

    return data;
};

export const getBannedPostings = async () => {
    const { data } = await Axios.get(API_URL + "/api/admin/bannedposting", { withCredentials: true });

    return data;
};

