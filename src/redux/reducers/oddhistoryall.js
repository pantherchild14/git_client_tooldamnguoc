import { INIT_STATE } from "../../constant";
import { getOddHistoryAll, getType } from "../actions";

export default function oddHistoryAllReducers(state = INIT_STATE.oddhistoryall, action) {
    switch (action.type) {
        case getType(getOddHistoryAll.getOddHistoryAllRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddHistoryAll.getOddHistoryAllSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddHistoryAll.getOddHistoryAllFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}