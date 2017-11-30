import * as types from '../constants/actionTypes';
import {initItemState} from "../reducers/item";

export const setItem = itme => ({type: types.SET_ITEM, item: itme});

export const initItem = () => {
    return setItem({...initItemState, occurred_at: new Date()});
};

export const setItemType = type => ({type: types.SET_ITEM_TYPE, itemType: type});

export const setItemAmount = amount => ({type: types.SET_ITEM_AMOUNT, amount});

export const setItemRemark = remark => ({type: types.SET_ITEM_REMARK, remark});

export const setItemOccurredAt = occurredAt => ({type: types.SET_ITEM_OCCURRED_AT, occurred_at: occurredAt});

export const setItemAccount = account => ({type: types.SET_ITEM_ACCOUNT, account});

export const setItemTransferFromAccount = account => ({type: types.SET_ITEM_TRANSFER_FROM_ACCOUNT, account});

export const setItemTransferToAccount = account => ({type: types.SET_ITEM_TRANSFER_TO_ACCOUNT, account});

export const setItemExpenditureCategory = categoryId => ({
    type: types.SET_ITEM_EXPENDITURE_CATEGORY,
    expenditure_category: categoryId
});

export const setItemIncomeCategory = categoryId => ({
    type: types.SET_ITEM_INCOME_CATEGORY,
    income_category: categoryId
});

export const setItemTransferCategory = categoryId => ({
    type: types.SET_ITEM_TRANSFER_CATEGORY,
    transfer_category: categoryId
});

export const setItemLoanCategory = categoryId => ({
    type: types.SET_ITEM_LOAN_CATEGORY,
    loan_category: categoryId
});