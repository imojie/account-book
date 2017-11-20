import {SET_INCOME_CATEGORIES} from '../constants/actionTypes';

export const initIncomeCategories = {
    1: {
        id: 1,
        name: '薪水',
    },
    2: {
        id: 2,
        name: '奖金',
    },
    3: {
        id: 3,
        name: '兼职',
    },
    4: {
        id: 4,
        name: '红包',
    },
};

export default function incomeCategoriesReducer(state = initIncomeCategories, action) {
    switch (action.type) {
        case SET_INCOME_CATEGORIES:
            return {...state, ...action.categories};
        default:
            return state;
    }
}