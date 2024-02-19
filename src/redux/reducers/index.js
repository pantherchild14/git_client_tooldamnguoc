import { combineReducers } from "redux";
import schedulesday from "./schedulesday";
import schedules from "./schedules";
import schedulesingle from "./schedulesingle";
import odds from "./odds";
import oddhistory from "./oddhistory";
import oddhistoryall from "./oddhistoryall";
import oddhistoryarr from "./oddhistoryarr";
import stats from "./stats";
import detail from "./detail";
import statsall from "./statsall";
import detailall from "./detailall";
import analysis from "./analysis";
import analysisall from "./analysisall";


export default combineReducers({
    schedules,
    schedulesday,
    schedulesingle,
    odds,
    oddhistory,
    oddhistoryall,
    oddhistoryarr,
    stats,
    detail,
    statsall,
    detailall,
    analysis,
    analysisall,
})