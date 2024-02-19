import { takeLatest, call, put, delay } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchScheduleDaySaga(action) {
    try {
        const { day } = action.payload;

        yield put(actions.getSchedulesDay.clearSchedulesDay());

        while (true) {
            const schedule = yield call(api.fetchScheduleDay, day);
            yield put(actions.getSchedulesDay.getSchedulesDaySuccess(schedule.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching schedule:", error);
    }
}

function* fetchScheduleSaga(action) {
    try {
        // const { day } = action.payload;

        yield put(actions.getSchedules.clearSchedules());

        // const schedule = yield call(api.fetchSchedule, day);
        while (true) {
            const schedule = yield call(api.fetchSchedule);
            yield put(actions.getSchedules.getSchedulesSuccess(schedule.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching schedule:", error);
    }
}

function* fetchScheduleSingleSaga(action) {
    try {
        const { id } = action.payload;

        yield put(actions.getScheduleSingle.clearSchedules());

        while (true) {
            const schedule = yield call(api.fetchScheduleSingle, id);
            yield put(actions.getScheduleSingle.getScheduleSingleSuccess(schedule.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching schedule:", error);
    }
}


function* fetchRTSaga(action) {
    try {
        while (true) {
            const odd = yield call(api.fetchOdds);
            yield put(actions.getOdds.getOddsSuccess(odd.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchOddHistorySaga(action) {
    try {
        const { id } = action.payload;
        while (true) {
            const odd_history = yield call(api.fetchOddHistory, id);
            yield put(actions.getOddHistory.getOddHistorySuccess(odd_history.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchOddHistoryAllSaga(action) {
    try {
        const odd_history = yield call(api.fetchOddHistoryAll);
        yield put(actions.getOddHistoryAll.getOddHistoryAllSuccess(odd_history.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchOddHistoryArrSaga(action) {
    try {
        const odd_history = yield call(api.fetchOddHistoryArr);
        yield put(actions.getOddHistoryArr.getOddHistoryArrSuccess(odd_history.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchStatsSaga(action) {
    try {

        const { id } = action.payload;

        // yield put(actions.getStats.clearStats());
        while (true) {
            const stats = yield call(api.fetchStats, id);
            yield put(actions.getStats.getStatsSuccess(stats.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchDetailSaga(action) {
    try {
        const { id } = action.payload;
        // yield put(actions.getDetail.clearDetail());
        while (true) {
            const detail = yield call(api.fetchDetail, id);
            yield put(actions.getDetail.getDetailSuccess(detail.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchAnalysisSaga(action) {
    try {
        const { id } = action.payload;
        // yield put(actions.getAnalysis.clearAnalysis());
        const analysis = yield call(api.fetchAnalysis, id);
        yield put(actions.getAnalysis.getAnalysisSuccess(analysis.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchAnalysisAllSaga(action) {
    try {
        const analysis = yield call(api.fetchAnalysisAll);
        yield put(actions.getAnalysisAll.getAnalysisAllSuccess(analysis.data));
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchStatsAllSaga(action) {
    try {
        while (true) {
            const stats = yield call(api.fetchStatsAll);
            yield put(actions.getStatsAll.getStatsAllSuccess(stats.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* fetchDetailAllSaga(action) {
    try {
        while (true) {
            const detail = yield call(api.fetchDetailAll);
            yield put(actions.getDetailAll.getDetailAllSuccess(detail.data));
            yield delay(10000);
        }
    } catch (error) {
        console.error("Error fetching rt:", error);
    }
}

function* myScheduleDaySaga() {
    yield takeLatest(actions.getSchedulesDay.getSchedulesDayRequest, fetchScheduleDaySaga);
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

function* myoddHistoryAllSaga() {
    yield takeLatest(actions.getOddHistoryAll.getOddHistoryAllRequest, fetchOddHistoryAllSaga);
}

function* myoddHistoryArrSaga() {
    yield takeLatest(actions.getOddHistoryArr.getOddHistoryArrRequest, fetchOddHistoryArrSaga);
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


function* myAnalysisAllSaga() {
    yield takeLatest(actions.getAnalysisAll.getAnalysisAllRequest, fetchAnalysisAllSaga);
}


function* myStatsAllSaga() {
    yield takeLatest(actions.getStatsAll.getStatsAllRequest, fetchStatsAllSaga);
}

function* myDetailAllSaga() {
    yield takeLatest(actions.getDetailAll.getDetailAllRequest, fetchDetailAllSaga);
}

export {
    myScheduleDaySaga,
    myScheduleSaga,
    myScheduleSingleSaga,
    myoddsSaga,
    myoddHistorySaga,
    myoddHistoryAllSaga,
    myoddHistoryArrSaga,
    myStatsSaga,
    myStatsAllSaga,
    myDetailSaga,
    myDetailAllSaga,
    myAnalysisSaga,
    myAnalysisAllSaga
};