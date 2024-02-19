import { INIT_STATE } from "../../constant";
import { getDetail, getType } from "../actions";

export default function oddsReducers(state = INIT_STATE.detail, action) {
    switch (action.type) {
        case getType(getDetail.getDetailRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getDetail.getDetailSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getDetail.getDetailFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getDetail.clearDetail):
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}