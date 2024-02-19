import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getSchedulesDay = createActions({
    getSchedulesDayRequest: (day) => ({ day }),
    getSchedulesDaySuccess: (payload) => payload,
    getSchedulesDayFailure: (err) => err,
    clearSchedulesDay: () => ({}),
});

export const getSchedules = createActions({
    getSchedulesRequest: undefined,
    getSchedulesSuccess: (payload) => payload,
    getSchedulesFailure: (err) => err,
    clearSchedules: () => ({}),
});

export const getScheduleSingle = createActions({
    getScheduleSingleRequest: (id) => ({ id }),
    getScheduleSingleSuccess: (payload) => payload,
    getScheduleSingleFailure: (err) => err,
    clearSchedules: () => ({}),
});

export const getOdds = createActions({
    getOddsRequest: undefined,
    getOddsSuccess: (payload) => payload,
    getOddsFailure: (err) => err,
});

export const getStats = createActions({
    getStatsRequest: (id) => ({ id }),
    getStatsSuccess: (payload) => payload,
    getStatsFailure: (err) => err,
    clearStats: () => ({}),
});

export const getDetail = createActions({
    getDetailRequest: (id) => ({ id }),
    getDetailSuccess: (payload) => payload,
    getDetailFailure: (err) => err,
    clearDetail: () => ({}),
});

export const getAnalysis = createActions({
    getAnalysisRequest: (id) => ({ id }),
    getAnalysisSuccess: (payload) => payload,
    getAnalysisFailure: (err) => err,
    clearAnalysis: () => ({}),
});

export const getAnalysisAll = createActions({
    getAnalysisAllRequest: undefined,
    getAnalysisAllSuccess: (payload) => payload,
    getAnalysisAllFailure: (err) => err,
});

export const getStatsAll = createActions({
    getStatsAllRequest: undefined,
    getStatsAllSuccess: (payload) => payload,
    getStatsAllFailure: (err) => err,
});

export const getDetailAll = createActions({
    getDetailAllRequest: undefined,
    getDetailAllSuccess: (payload) => payload,
    getDetailAllFailure: (err) => err,
});

export const getOddHistory = createActions({
    getOddHistoryRequest: (id) => ({ id }),
    getOddHistorySuccess: (payload) => payload,
    getOddHistoryFailure: (err) => err,
});

export const getOddHistoryAll = createActions({
    getOddHistoryAllRequest: undefined,
    getOddHistoryAllSuccess: (payload) => payload,
    getOddHistoryAllFailure: (err) => err,
});

export const getOddHistoryArr = createActions({
    getOddHistoryArrRequest: undefined,
    getOddHistoryArrSuccess: (payload) => payload,
    getOddHistoryArrFailure: (err) => err,
});