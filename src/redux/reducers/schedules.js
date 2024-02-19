import { INIT_STATE } from "../../constant";
import { getSchedules, getType } from "../actions";

export default function scheduleReducers(state = INIT_STATE.schedule, action) {
    switch (action.type) {
        case getType(getSchedules.getSchedulesRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSchedules.getSchedulesSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getSchedules.getSchedulesFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getSchedules.clearSchedules):
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}
