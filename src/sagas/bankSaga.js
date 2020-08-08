import {all, put, takeLatest} from "@redux-saga/core/effects";
import * as types from "../actions/types";
import axios from "axios";
import { message } from "antd";


function* getBanks(action) {
    const { page, companyId } = action;
    try {
        const companies = yield axios.get(`/api/v1/companies/${companyId}/bank_details?page=${page}`).then(res => res.data);
        yield put({type: types.BANKS_RECEIVED, payload: companies});
    } catch (error) {
        yield put({type: types.BANKS_FAILED, error});
    }
}


function* addBank(action) {
    const { bank, page, companyId } = action;   
    try {
        const bankResponse = yield axios.post(`/api/v1/companies/${companyId}/bank_details/`, bank).then(res => res.data);
        yield put({type: types.ADD_BANK_SUCCESS, payload: bankResponse});
        yield getBanks({page: page, companyId: companyId});     
    } catch (error) {
        yield put({type: types.ADD_BANK_FAILED, error});
        message.error('Ошибка при добавлении!')
    }
}

function* updateBank(action) {
    
    const { bank, page, companyId } = action; 
    console.log(page)
    try {
        const bankResponse = yield axios.put(`/api/v1/companies/${companyId}/bank_details/${bank.id}/`, bank).then(res => res.data);
        yield put({type: types.UPDATE_BANK_SUCCESS, payload: bankResponse});
        yield getBanks({page: page, companyId: companyId});
    } catch (error) {
        yield put({type: types.UPDATE_BANK_FAILED, error});
        message.error('Ошибка при редактировании!')
    }
}

function* deleteBank(action) {
    const { id, page, companyId } = action; 
    try {
        const bankResponse = yield axios.delete(`/api/v1/companies/${companyId}/bank_details/${id}`).then(res => res.data);
        yield put({type: types.DELETE_BANK_SUCCESS, payload: bankResponse});
        yield getBanks({page: page, companyId: companyId});
    } catch (error) {
        yield put({type: types.DELETE_BANK_FAILED, error});
        message.error('Ошибка при удалении!')
    }
}

export function* bankSaga() {
    yield all([
        yield takeLatest(types.GET_BANKS, getBanks),
        yield takeLatest(types.ADD_BANK, addBank),
        yield takeLatest(types.UPDATE_BANK, updateBank),
        yield takeLatest(types.DELETE_BANK, deleteBank),
    ]);
}