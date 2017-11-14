import React, {Component} from 'react';
import {WingBlank, WhiteSpace, List} from 'antd-mobile';


class Account extends Component {
    render() {
        const {id, name} = this.props.account;
        console.log('acount props: ', this.props, 'id: ', id, 'name:', name);
        return (
            <List.Item onClick={this.props.onClick}>{name}</List.Item>
        );
    }
}

export default Account;