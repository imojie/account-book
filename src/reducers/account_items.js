import {SET_ACCOUNT_ITEMS, SET_ACCOUNT_ITEMS_UI} from '../constants/actionTypes';

export default function accountItemsReducer(state = {}, action) {
    switch (action.type) {
        case SET_ACCOUNT_ITEMS:
            return {...state, ...action.account_items};
        default:
            return state;
    }
}

export const accountItemsUiReducer = (state = {page: 1, hasMore: true, scrollX: 0, scrollY: 0}, action) => {
    switch (action.type) {
        case SET_ACCOUNT_ITEMS_UI:
            return {...state, ...action.ui};
        default:
            return state;
    }
};