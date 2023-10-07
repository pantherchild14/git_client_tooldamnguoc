import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
};

// export const getSchedules = createActions({
//     getSchedulesRequest: (day) => ({ day }),
//     getSchedulesSuccess: (payload) => payload,
//     getSchedulesFailure: (err) => err,
//     clearSchedules: () => ({}),
// });

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
});

export const getDetail = createActions({
    getDetailRequest: (id) => ({ id }),
    getDetailSuccess: (payload) => payload,
    getDetailFailure: (err) => err,
});

export const getAnalysis = createActions({
    getAnalysisRequest: (id) => ({ id }),
    getAnalysisSuccess: (payload) => payload,
    getAnalysisFailure: (err) => err,
});

export const getOddHistory = createActions({
    getOddHistoryRequest: (id) => ({ id }),
    getOddHistorySuccess: (payload) => payload,
    getOddHistoryFailure: (err) => err,
});