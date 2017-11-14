import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route} from 'react-router-dom';
// import {
//     AccountItemReducer,
//     ItemAmountReducer,
//     ItemAccountReducer,
//     ItemCategoryReducer,
//     UserReducer,
//     ExpenditureCategoriesReducer
// } from '../src/redux/ToBeSubmittedAccountItem';
import AccountBookApp from './components/AccountBookApp';
// import EditAccountItem from '../src/components/EditAccountItem';
// import EditAccount from '../src/components/EditAccount';
// import AccountList from '../src/components/AccountList';
// import AccountItems from '../src/components/AccountItems';
// import ExpenditureCategories from '../src/components/ExpenditureCategories';
// import IncomeCategories from '../src/components/IncomeCategories';
import Login from './components/Login';
// import Me from '../src/components/Me';
// import UpdatePassword from '../src/components/UpdatePassword';
import NoMatch from './components/NoMatch';
import itemReducer from './reducers/item';
import accountsReducer from "./reducers/accounts";
import expenditureCategoriesReducer from "./reducers/expenditure_categories";

import {composeWithDevTools} from 'redux-devtools-extension';


let reducers = combineReducers({
    // AccountItemReducer,
    // ItemAmountReducer,
    // ItemAccountReducer,
    // ItemCategoryReducer,
    // UserReducer,
    // ExpenditureCategoriesReducer,
    "accountItem": itemReducer,
    "entities": combineReducers({
        "accounts": accountsReducer,
        "expenditure_categories": expenditureCategoriesReducer,
    })
});

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={AccountBookApp}/>
                {/*<Route path="/account-items" component={AccountItems}/>*/}
                {/*<Route path="/edit-account-item/:id?" component={EditAccountItem}/>*/}
                {/*<Route path="/edit-account/:id?" component={EditAccount}/>*/}
                {/*<Route path="/expenditure-categories" component={ExpenditureCategories}/>*/}
                {/*<Route path="/income-categories" component={IncomeCategories}/>*/}
                {/*<Route path="/accounts" component={AccountList}/>*/}
                <Route path="/passport/login" component={Login}/>
                {/*<Route path="/me" component={Me}/>*/}
                {/*<Route path="/update-password" component={UpdatePassword}/>*/}
                <Route component={NoMatch}/>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);