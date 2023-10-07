import { takeLatest, call, put, delay } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchScheduleSaga(action) {
    try {
        // const { day } = action.payload;

        yield put(actions.getSchedules.clearSchedules());

        // const schedule = yield call(api.fetchSchedule, day);
        const schedule = yield call(api.fetchSchedule);
        yield put(actions.getSchedules.getSchedulesSuccess(schedule.data));
        yield delay(60000);
    } catch (error) {
        console.error("Error fetching schedule:", error);
    }
}

function* fetchScheduleSingleSaga(action) {
    try {
        const { id } = action.payload;

        yield put(actions.getScheduleSingle.clearSchedules());

        const schedule = yield call(api.fetchScheduleSingle, id);
        yield put(actions.getScheduleSingle.getScheduleSingleSuccess(schedule.data));
        yield delay(60000);
    } catch (error) {
        console.error("Error fetching schedule:", error);
    }
}


function* fetchRTSaga(action) {
    try {
        const odd = yield call(api.fetchOdds);
        yield put(actions.getOdds.getOddsSuccess(odd.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchOddHistorySaga(action) {
    try {
        const { id } = action.payload;
        const odd_history = yield call(api.fetchOddHistory, id);
        yield put(actions.getOddHistory.getOddHistorySuccess(odd_history.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchStatsSaga(action) {
    try {
        const { id } = action.payload;
        const stats = yield call(api.fetchStats, id);
        yield put(actions.getStats.getStatsSuccess(stats.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchDetailSaga(action) {
    try {
        const { id } = action.payload;
        const detail = yield call(api.fetchDetail, id);
        yield put(actions.getDetail.getDetailSuccess(detail.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchAnalysisSaga(action) {
    try {
        const { id } = action.payload;
        const analysis = yield call(api.fetchAnalysis, id);
        yield put(actions.getAnalysis.getAnalysisSuccess(analysis.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}



function* myScheduleSaga() {
    yield takeLatest(actions.getSchedules.getSchedulesRequest, fetchScheduleSaga);
}

function* myScheduleSingleSaga() {
    yield takeLatest(actions.getScheduleSingle.getScheduleSingleRequest, fetchScheduleSingleSaga);
}

function* myoddsSaga() {
    yield takeLatest(actions.getOdds.getOddsRequest, fetchRTSaga);
}

function* myoddHistorySaga() {
    yield takeLatest(actions.getOddHistory.getOddHistoryRequest, fetchOddHistorySaga);
}

function* myStatsSaga() {
    yield takeLatest(actions.getStats.getStatsRequest, fetchStatsSaga);
}

function* myDetailSaga() {
    yield takeLatest(actions.getDetail.getDetailRequest, fetchDetailSaga);
}

function* myAnalysisSaga() {
    yield takeLatest(actions.getAnalysis.getAnalysisRequest, fetchAnalysisSaga);
}

export {
    myScheduleSaga,
    myScheduleSingleSaga,
    myoddsSaga,
    myoddHistorySaga,
    myStatsSaga,
    myDetailSaga,
    myAnalysisSaga
};