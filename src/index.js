import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route} from 'react-router-dom';

// 组件
import EditAccountItem from './components/EditAccountItem';
import ExpenditureCategories from './components/ExpenditureCategories';
import IncomeCategories from './components/IncomeCategories';
import EditAccount from './components/EditAccount';
import Login from './components/Login';
import AppTabBar from '../src/components/AppTabBar';
import UpdatePassword from '../src/components/UpdatePassword';
import NoMatch from './components/NoMatch';

// reducer
import userReducer from './reducers/user';
import itemReducer from './reducers/item';
import accountsReducer from "./reducers/accounts";
import expenditureCategoriesReducer from "./reducers/expenditure_categories";
import incomeCategoriesReducer from "./reducers/income_categories";

// devTool
import {composeWithDevTools} from 'redux-devtools-extension';

let reducers = combineReducers({
    "user": userReducer,
    "accountItem": itemReducer,
    "entities": combineReducers({
        "accounts": accountsReducer,
        "expenditure_categories": expenditureCategoriesReducer,
        "income_categories": incomeCategoriesReducer,
    })
});

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={AppTabBar}/>
                <Route path="/account-items" component={AppTabBar}/>
                <Route path="/accounts" component={AppTabBar}/>
                <Route path="/me" component={AppTabBar}/>
                <Route path="/edit-account-item/:id?" component={EditAccountItem}/>
                <Route path="/edit-account/:id?" component={EditAccount}/>
                <Route path="/expenditure-categories" component={ExpenditureCategories}/>
                <Route path="/income-categories" component={IncomeCategories}/>
                <Route path="/passport/login" component={Login}/>
                <Route path="/update-password" component={UpdatePassword}/>
                <Route component={NoMatch}/>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);