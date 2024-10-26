import axios from "axios";

const BASE_URL = 'https://dummyjson.com/';

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})