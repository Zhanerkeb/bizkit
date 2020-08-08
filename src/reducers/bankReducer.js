
import * as types from '../actions/types';
const initialState = {
    banks: {},
    bankResponse: {},
    isLoading: false,
};

export default function bankReducer (state = initialState, action) {
    switch (action.type) {
    case types.GET_BANKS:
        return { ...state, isLoading: true };
    case types.BANKS_RECEIVED:
        return { ...state, isLoading: false, banks: action.payload };
    case types.BANKS_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.ADD_BANK:
        return { ...state, isLoading: true };
    case types.ADD_BANK_SUCCESS:
        return { ...state, isLoading: false, bankResponse: action.payload };
    case types.ADD_BANK_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.DELETE_BANK:
        return { ...state, isLoading: true };
    case types.DELETE_BANK_SUCCESS:
        return { ...state, isLoading: false, bankResponse: action.payload };
    case types.DELETE_BANK_FAILED:
        return { ...state, isLoading: false, error: action.error };
    case types.UPDATE_BANK:
        return { ...state, isLoading: true };
    case types.UPDATE_BANK_SUCCESS:
        return { ...state, isLoading: false, bankResponse: action.payload };
    case types.UPDATE_BANK_FAILED:
        return { ...state, isLoading: false, error: action.error };
    default:
        return state;
    }
}
