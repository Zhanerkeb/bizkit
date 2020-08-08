
import * as types from '../actions/types';
const initialState = {
    companies: {},
    company: {},
    companyResponse: {},
    isLoading: false,
};

export default function сompanyReducer (state = initialState, action) {
    switch (action.type) {
    case types.GET_COMPANIES:
        return { ...state, isLoading: true };
    case types.COMPANIES_RECEIVED:
        return { ...state, isLoading: false, companies: action.payload };
    case types.COMPANIES_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.GET_COMPANY:
        return { ...state, isLoading: true };
    case types.COMPANY_RECEIVED:
        return { ...state, isLoading: false, company: action.payload };
    case types.COMPANY_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.ADD_COMPANY:
        return { ...state, isLoading: true };
    case types.ADD_COMPANY_SUCCESS:
        return { ...state, isLoading: false, companyResponse: action.payload };
    case types.ADD_COMPANY_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.DELETE_COMPANY:
        return { ...state, isLoading: true };
    case types.DELETE_COMPANY_SUCCESS:
        return { ...state, isLoading: false, companyResponse: action.payload };
    case types.DELETE_COMPANY_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.UPDATE_COMPANY:
        return { ...state, isLoading: true };
    case types.UPDATE_COMPANY_SUCCESS:
        return { ...state, isLoading: false, companyResponse: action.payload };
    case types.UPDATE_COMPANY_FAILED:
        return { ...state, isLoading: false, error: action.error };
    default:
        return state;
    }
}
