import { INIT_STATE } from "../../constant";
import { getAnalysis, getType } from "../actions";

export default function oddsReducers(state = INIT_STATE.analysis, action) {
    switch (action.type) {
        case getType(getAnalysis.getAnalysisRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getAnalysis.getAnalysisSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getAnalysis.getAnalysisFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getAnalysis.clearAnalysis):
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
}