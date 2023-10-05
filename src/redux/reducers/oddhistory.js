import { INIT_STATE } from "../../constant";
import { getOddHistory, getType } from "../actions";

export default function oddHistoryReducers(state = INIT_STATE.oddhistory, action) {
    switch (action.type) {
        case getType(getOddHistory.getOddHistoryRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddHistory.getOddHistorySuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddHistory.getOddHistoryFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}