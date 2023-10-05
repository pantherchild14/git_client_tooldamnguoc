import { combineReducers } from "redux";
import schedules from "./schedules";
import schedulesingle from "./schedulesingle";
import odds from "./odds";
import oddhistory from "./oddhistory";
import stats from "./stats";
import detail from "./detail";
import analysis from "./analysis";


export default combineReducers({
    schedules,
    schedulesingle,
    odds,
    oddhistory,
    stats,
    detail,
    analysis,
})