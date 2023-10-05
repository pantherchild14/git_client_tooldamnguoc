import axios from "axios";

const URL = `${process.env.REACT_APP_URL_SERVER}`;

// export const instance = axios.create({
//     baseURL: "http://localhost:5000",
// })

export const fetchSchedule = (day) => axios.get(`${URL}/sport/football/schedule/${day}`);

export const fetchScheduleSingle = (id) => axios.get(`${URL}/sport/football/scheduleSingle/${id}`);

export const fetchOdds = () => axios.get(`${URL}/sport/football/odds`);

export const fetchDetail = (id) => axios.get(`${URL}/sport/football/detail/${id}`);

export const fetchStats = (id) => axios.get(`${URL}/sport/football/stats/${id}`);

export const fetchAnalysis = (id) => axios.get(`${URL}/sport/football/analysis/${id}`);

export const fetchOddHistory = (id) => axios.get(`${URL}/sport/football/odds_history/${id}`);

export const fetchLogin = (data) => axios.post(`${URL}/api/user/login`, data);