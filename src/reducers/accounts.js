import {SET_ACCOUNTS} from '../constants/actionTypes';

export default function accountsReducer(state = {}, action) {
    switch (action.type) {
        case SET_ACCOUNTS:
            return {...state, ...action.accounts};
        default:
            return state;
    }
}