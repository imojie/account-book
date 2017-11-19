import React, {Component} from 'react';
import {List, NavBar, Icon} from 'antd-mobile';
import Account from './Account';
import axios from "axios/index";
import {connect} from 'react-redux';
import {setAccounts} from "../actions/accounts";
import {setItemAccount} from "../actions/item";


class AccountList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let _self = this;

        let localUser = localStorage.getItem('user');
        let user = localUser ? JSON.parse(localUser) : {};
        let accessToken = '';
        if (user && user.token && user.token.access_token) {
            accessToken = user.token.access_token;
        }
        if (!accessToken) {
            return;
        }

        let instance = axios.create({
            baseURL: 'http://account-book.app/api/',
            timeout: 3000,
            headers: {'Authorization': 'Bearer ' + accessToken}
        });
        instance.get('accounts')
            .then(function (response) {
                console.log(response);
                _self.props.setAccounts(response.data.data);
            })
            .catch(function (response) {
                if (response instanceof Error) {
                    console.log('Error', response.message, response.response);
                } else {
                    console.log(response);
                }
            });
    }

    handleClick(accountId) {
        this.props.setItemAccount(accountId);
        this.props.history.goBack();
    }

    render() {
        let accounts = [];
        for (let id in this.props.accounts) {
            let account = this.props.accounts[id];
            accounts.push(
                <Account
                    id={account.id}
                    key={account.id}
                    onClick={this.handleClick.bind(this, id)}
                    account={account}
                />
            );
        }

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >选择账户</NavBar>
                {Object.keys(this.props.accounts).length > 0 ? (<List>{accounts}</List>) : (<div>暂无账号</div>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.entities.accounts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAccounts: (accounts) => {
            dispatch(setAccounts(accounts));
        },
        setItemAccount: (accountId) => {
            dispatch(setItemAccount(accountId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
