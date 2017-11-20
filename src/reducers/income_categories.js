import {SET_INCOME_CATEGORIES} from '../constants/actionTypes';

export const initIncomeCategories = [
    {
        id: 1,
        name: '薪水',
    },
    {
        id: 2,
        name: '奖金',
    },
    {
        id: 3,
        name: '兼职',
    },
    {
        id: 4,
        name: '红包',
    },
];

export default function incomeCategoriesReducer(state = initIncomeCategories, action) {
    switch (action.type) {
        case SET_INCOME_CATEGORIES:
            return [...state, ...action.categories];
        default:
            return state;
    }
}