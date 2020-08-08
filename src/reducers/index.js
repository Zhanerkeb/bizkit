import { combineReducers } from 'redux';
import company from "./companyReducer";
import auth from "./authReducer";
import bank from "./bankReducer";

export default combineReducers({
    company,
    auth,
    bank
});