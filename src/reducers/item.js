import {
    SET_ITEM,
    SET_ITEM_TYPE,
    SET_ITEM_AMOUNT,
    SET_ITEM_ACCOUNT,
    SET_ITEM_EXPENDITURE_CATEGORY,
    SET_ITEM_TRANSFER_CATEGORY,
    SET_ITEM_OCCURRED_AT, SET_ITEM_REMARK
} from '../constants/actionTypes';

export const initItemState = {
    id: 0,
    type: "2",
    amount: "",
    remark: "",
    occurred_at: null,
    account: 0,

    expenditure_category: 0,

    income_category: 0,

    loan_category: 0,
    loan_from_account: 0,
    loan_to_account: 0,

    transfer_category: 0,
    transfer_from_account: 0,
    transfer_to_account: 0,

};

export default function itemReducer(state = initItemState, action) {
    switch (action.type) {
        case SET_ITEM:
            return {...state, ...action.item};
        case SET_ITEM_TYPE:
            return {...state, type: action.itemType};
        case SET_ITEM_AMOUNT:
            return {...state, amount: action.amount};
        case SET_ITEM_REMARK:
            return {...state, remark: action.remark};
        case SET_ITEM_OCCURRED_AT:
            return {...state, occurred_at: action.occurred_at};
        case SET_ITEM_ACCOUNT:
            return {...state, account: action.account};
        case SET_ITEM_EXPENDITURE_CATEGORY:
            return {...state, expenditure_category: action.expenditure_category};
        case SET_ITEM_TRANSFER_CATEGORY:
            return {...state, transfer_category: action.transfer_category};
        default:
            return state;
    }
}