import { INIT_STATE } from "../../constant";
import { getScheduleSingle, getType } from "../actions";

export default function scheduleSingleReducers(state = INIT_STATE.schedulesingle, action) {
    switch (action.type) {
        case getType(getScheduleSingle.getScheduleSingleRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getScheduleSingle.getScheduleSingleSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getScheduleSingle.getScheduleSingleFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getScheduleSingle.clearSchedules):
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}
