import React, {Component} from 'react';
import {List} from 'antd-mobile';
import {sprintf} from 'sprintf-js';
import moment from 'moment';
import 'moment/locale/zh-cn';

import '../style/items.css';

const Item = List.Item;
const Brief = Item.Brief;


class AccountItem extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {id, type, amount, category_name, occurred_at, from_account, to_account} = this.props.accountItem;

        return (
            <div className="account-item" onClick={this.handleClick.bind(this)}>
                <div className="day">{moment(occurred_at).format('DD') + '日'}</div>
                <div className="info">
                    <div className="first-row">
                        <div className="category">{category_name}</div>
                        <div className="amount">{sprintf('%.2f', amount / 100)}</div>
                    </div>
                    <div className="second-row">
                        <div className="occurred_at">{moment(occurred_at).format('HH:mm')}</div>
                        <div className="account">{'余额宝'}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountItem;