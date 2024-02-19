import { INIT_STATE } from "../../constant";
import { getAnalysisAll, getType } from "../actions";

export default function analysisAllReducers(state = INIT_STATE.analysisall, action) {
    switch (action.type) {
        case getType(getAnalysisAll.getAnalysisAllRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getAnalysisAll.getAnalysisAllSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getAnalysisAll.getAnalysisAllFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}