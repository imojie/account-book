import * as types from '../constants/actionTypes';
import {initItemState} from "../reducers/item";
import moment from 'moment';
import 'moment/locale/zh-cn';

export const setItem = itme => ({type: types.SET_ITEM, item: itme});

export const initItem = () => {
    return setItem({...initItemState, occurred_at: moment().locale('zh-cn').utcOffset(8)});
};

export const setItemType = type => ({type: types.SET_ITEM_TYPE, itemType: type});

export const setItemAmount = amount => ({type: types.SET_ITEM_AMOUNT, amount});

export const setItemRemark = remark => ({type: types.SET_ITEM_REMARK, remark});

export const setItemOccurredAt = occurredAt => ({type: types.SET_ITEM_OCCURRED_AT, occurred_at: occurredAt});

export const setItemAccount = account => ({type: types.SET_ITEM_ACCOUNT, account});

export const setItemExpenditureCategory = categoryId => ({
    type: types.SET_ITEM_EXPENDITURE_CATEGORY,
    expenditure_category: categoryId
});

export const setItemTransferCategory = categoryId => ({
    type: types.SET_ITEM_TRANSFER_CATEGORY,
    transfer_category: categoryId
});