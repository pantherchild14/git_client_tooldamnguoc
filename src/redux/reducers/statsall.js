import { INIT_STATE } from "../../constant";
import { getStatsAll, getType } from "../actions";

export default function statAllReducers(state = INIT_STATE.statsall, action) {
    switch (action.type) {
        case getType(getStatsAll.getStatsAllRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getStatsAll.getStatsAllSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getStatsAll.getStatsAllFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}