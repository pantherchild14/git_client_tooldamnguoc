import { INIT_STATE } from "../../constant";
import { getOddHistoryArr, getType } from "../actions";

export default function oddHistoryAllReducers(state = INIT_STATE.oddhistoryarr, action) {
    switch (action.type) {
        case getType(getOddHistoryArr.getOddHistoryArrRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOddHistoryArr.getOddHistoryArrSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOddHistoryArr.getOddHistoryArrFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}