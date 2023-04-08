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

// export const updateReleasePosting = async () => {
//     const { data } = await Axios.get(API_URL + "/api/admin/releaseposting", { withCredentials: true });

//     return data;
// };

// export const updateBanPosting = async () => {
//     const { data } = await Axios.get(API_URL + "/api/admin/banposting", { withCredentials: true });

//     return data;
// };