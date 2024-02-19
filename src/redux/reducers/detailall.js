import { INIT_STATE } from "../../constant";
import { getDetailAll, getType } from "../actions";

export default function detailAllReducers(state = INIT_STATE.detailall, action) {
    switch (action.type) {
        case getType(getDetailAll.getDetailAllRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getDetailAll.getDetailAllSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getDetailAll.getDetailAllFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}