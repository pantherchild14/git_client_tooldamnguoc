import { INIT_STATE } from "../../constant";
import { getOdds, getType } from "../actions";

export default function oddsReducers(state = INIT_STATE.odd, action) {
    switch (action.type) {
        case getType(getOdds.getOddsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getOdds.getOddsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getOdds.getOddsFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}