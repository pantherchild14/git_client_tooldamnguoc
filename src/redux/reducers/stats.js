import { INIT_STATE } from "../../constant";
import { getStats, getType } from "../actions";

export default function oddsReducers(state = INIT_STATE.stats, action) {
    switch (action.type) {
        case getType(getStats.getStatsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getStats.getStatsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getStats.getStatsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getStats.clearStats):
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}