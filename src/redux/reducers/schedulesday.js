import { INIT_STATE } from "../../constant";
import { getSchedulesDay, getType } from "../actions";

export default function scheduleReducers(state = INIT_STATE.scheduleday, action) {
    switch (action.type) {
        case getType(getSchedulesDay.getSchedulesDayRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSchedulesDay.getSchedulesDaySuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getSchedulesDay.getSchedulesDayFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getSchedulesDay.clearSchedulesDay):
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}
