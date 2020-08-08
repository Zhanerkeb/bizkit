import {all, put, takeLatest} from "@redux-saga/core/effects";
import * as types from "../actions/types";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";
import { message } from 'antd';

function* signIn(action) {
    const { data, history } = action;
    try {
        const authResponse = yield axios.post(`/api/v1/token/`, data).then(res => res.data);
        const { access } = authResponse;
        setAuthToken(access);
        localStorage.setItem(`token`, access);
        const decoded = jwt_decode(access);
        yield put({type: types.SET_CURRENT_USER, payload: decoded});
        history.push(`/dashboard/client`);
        // window.location.reload();
    } catch (error) {
        yield put({type: types.SIGN_IN_FAILED, error});
        message.error(`Ошибка при авторизации!`);
    }
}
export function* signOut(action) {
    const { history } = action;
    localStorage.removeItem(`token`);
    setAuthToken(false);
    yield put ({type: types.SET_CURRENT_USER, payload: {}});
    history.push(`/`);
}


export function* authSaga() {
    yield all([
        yield takeLatest(types.SIGN_IN, signIn),
        yield takeLatest(types.SIGN_OUT, signOut)
    ]);
}