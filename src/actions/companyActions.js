import * as types from './types';

export function getCompanies(page) {
    return { type: types.GET_COMPANIES, page };
}
export function getById(id) {
    return { type: types.GET_COMPANY, id };
}

export function addCompany(company, page, handleClose) {
    return { type: types.ADD_COMPANY, company, page, handleClose };
}

export function deleteCompany(id, page) {
    return { type: types.DELETE_COMPANY, id, page };
}

export function updateCompany(company, id) {
    return { type: types.UPDATE_COMPANY, company, id };
}
