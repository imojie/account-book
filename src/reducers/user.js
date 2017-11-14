import {SET_USER} from '../constants/actionTypes';

export default function UserReducer(state, action) {
    let localUser = localStorage.getItem('user');
    localUser = localUser ? JSON.parse(localUser) : {};

    state = localUser;
    switch (action.type) {
        case SET_USER:
            state = {...state, ...action.user};
            localStorage.setItem('user', JSON.stringify(state));
            return state;
        default:
            return state;
    }
}