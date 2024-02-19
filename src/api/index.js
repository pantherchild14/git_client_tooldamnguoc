import axios from "axios";

const URL = `${process.env.REACT_APP_URL_SERVER}`;

// export const instance = axios.create({
//     baseURL: "http://localhost:5000",
// })

export const fetchScheduleDay = (day) => axios.get(`${URL}/sport/football/schedule/${day}`);
export const fetchSchedule = () => axios.get(`${URL}/sport/football/schedules`);

export const fetchScheduleSingle = (id) => axios.get(`${URL}/sport/football/scheduleSingle/${id}`);

export const fetchOdds = () => axios.get(`${URL}/sport/football/odds`);

export const fetchDetail = (id) => axios.get(`${URL}/sport/football/detail/${id}`);
export const fetchDetailAll = () => axios.get(`${URL}/sport/football/detail`);

export const fetchStats = (id) => axios.get(`${URL}/sport/football/stats/${id}`);
export const fetchStatsAll = () => axios.get(`${URL}/sport/football/stats`);

export const fetchAnalysis = (id) => axios.get(`${URL}/sport/football/analysis/${id}`);
export const fetchAnalysisAll = () => axios.get(`${URL}/sport/football/analysis`);

export const fetchOddHistoryAll = () => axios.get(`${URL}/sport/football/odds-history`);
export const fetchOddHistory = (id) => axios.get(`${URL}/sport/football/odds_history/${id}`);
export const fetchOddHistoryArr = () => axios.get(`${URL}/sport/football/odds_history`);

export const fetchLogin = (data) => axios.post(`${URL}/api/user/login`, data);