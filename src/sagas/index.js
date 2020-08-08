import { all } from 'redux-saga/effects';
import {companySaga} from "./companySaga";
import {authSaga} from "./authSaga";
import {bankSaga} from "./bankSaga";

export default function* rootSaga() {
    yield all([
        companySaga(),  
        authSaga(),
        bankSaga()
    ]);
}