import {INIT_ACCOUNT_ITEMS, SET_ACCOUNT_ITEMS, SET_ACCOUNT_ITEMS_UI} from '../constants/actionTypes';

export const setAccountItems = (accountItems) => ({type: SET_ACCOUNT_ITEMS, account_items: accountItems});
export const initAccountItems = (accountItems) => ({type: INIT_ACCOUNT_ITEMS, account_items: accountItems});
export const setAccountItemsUI = (ui) => ({type: SET_ACCOUNT_ITEMS_UI, ui: ui});
