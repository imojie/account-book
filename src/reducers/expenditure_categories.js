import {SET_EXPENDITURE_CATEGORIES} from '../constants/actionTypes';

export default function expenditureCategoriesReducer(state = {}, action) {
    switch (action.type) {
        case SET_EXPENDITURE_CATEGORIES:
            return {...state, ...action.categories};
        default:
            return state;
    }
}