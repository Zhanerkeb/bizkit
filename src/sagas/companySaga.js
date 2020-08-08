import {all, put, takeLatest} from "@redux-saga/core/effects";
import * as types from "../actions/types";
import axios from "axios";
import { message } from "antd";


function* getCompanies(action) {
    const { page } = action;
    try {
        const companies = yield axios.get(`/api/v1/companies?page=${page}`).then(res => res.data);
        yield put({type: types.COMPANIES_RECEIVED, payload: companies});
    } catch (error) {
        yield put({type: types.COMPANIES_FAILED, error});
    }
}

function* getById(action) {
    const { id } = action;
    try {
        const сompany = yield axios.get(`/api/v1/companies/${id}`).then(res => res.data);
        yield put({type: types.COMPANY_RECEIVED, payload: сompany});
    } catch (error) {
        yield put({type: types.COMPANY_FAILED, error});
    }
}

function* addCompany(action) {
    const { company, page, handleClose } = action; 
    console.log(page)
    try {
        const companyResponse = yield axios.post(`/api/v1/companies/`, company).then(res => res.data);
        yield put({type: types.ADD_COMPANY_SUCCESS, payload: companyResponse});
        handleClose();
        yield getCompanies({page: 1});
        message.success('Компания успешно добавлена!')
    } catch (error) {
        yield put({type: types.ADD_COMPANY_FAILED, error});
        message.error('Ошибка при добавлении!')
    }
}

function* updateCompany(action) {
    const { company, id } = action; 
    try {
        const companyResponse = yield axios.put(`/api/v1/companies/${id}/`, company).then(res => res.data);
        yield put({type: types.UPDATE_COMPANY_SUCCESS, payload: companyResponse});
        yield getById({id: id});
    } catch (error) {
        yield put({type: types.UPDATE_COMPANY_FAILED, error});
    }
}

function* deleteCompany(action) {
    const { id, page } = action; 
    try {
        const companyResponse = yield axios.delete(`/api/v1/companies/${id}/`).then(res => res.data);
        yield put({type: types.DELETE_COMPANY_SUCCESS, payload: companyResponse});
        message.success('Компания успешно удалена!')
        yield getCompanies(page);
    } catch (error) {
        yield put({type: types.DELETE_COMPANY_FAILED, error});
        message.error('Ошибка при удалении!')
    }
}

export function* companySaga() {
    yield all([
        yield takeLatest(types.GET_COMPANIES, getCompanies),
        yield takeLatest(types.ADD_COMPANY, addCompany),
        yield takeLatest(types.UPDATE_COMPANY, updateCompany),
        yield takeLatest(types.DELETE_COMPANY, deleteCompany),
        yield takeLatest(types.GET_COMPANY, getById)
    ]);
}