import * as types from './types';

export function getBanks(companyId, page) {
    return { type: types.GET_BANKS, companyId, page };
}

export function addBank(bank, companyId, page ) {
    return { type: types.ADD_BANK, bank, page, companyId };
}

export function deleteBank(id, companyId, page) {
    return { type: types.DELETE_BANK, id, companyId,  page };
}

export function updateBank(bank, companyId, page) {
    return { type: types.UPDATE_BANK, bank, companyId, page};
}
