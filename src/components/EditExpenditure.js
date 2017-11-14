import React, {Component} from 'react';
import {
    List,
    InputItem,
    DatePicker,
    TextareaItem,
} from 'antd-mobile';

import moment from 'moment';
import 'moment/locale/zh-cn';
import {connect} from "react-redux";
import {setItemAmount, setItemOccurredAt} from "../actions/item";
import {getAccountNameById} from "../services/account";

class EditExpenditure extends Component {

    componentWillMount() {
        console.log('----------------EditExpenditure.props', this.props);
    }

    getExpenditureCategoryName() {
        for (let pid in this.props.expenditureCategories) {
            let children = this.props.expenditureCategories[pid]['children'];
            for (let cid in children) {
                if (cid == this.props.accountItem.expenditure_category) {
                    return `${this.props.expenditureCategories[pid].name}-${children[cid].name}`;
                }
            }
        }
        return '';
    }

    render() {
        let {amount, remark, occurred_at} = this.props.accountItem;
        console.log('-----------occurred_at.ffffff', occurred_at);

        return (
            <div>
                <form>
                    <List>
                        <InputItem
                            type="money"
                            value={amount}
                            autoFocus={0 == amount}
                            placeholder="请输入金额"
                            onChange={(val) => this.props.setItemAmount(val)}
                            clear
                        >支出金额</InputItem>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/expenditure-categories')}
                            extra={this.getExpenditureCategoryName()}
                        >支出类型</List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/accounts?from=expenditure')}
                            extra={getAccountNameById(this.props.accounts, this.props.accountItem.account)}
                        >支出账户</List.Item>

                        <DatePicker
                            mode="datetime"
                            extra={occurred_at.format('YYYY-MM-DD HH:mm')}
                            onChange={(date) => this.props.setItemOccurredAt(date)}
                        >
                            <List.Item arrow="horizontal">支出时间</List.Item>
                        </DatePicker>

                        <TextareaItem
                            value={remark}
                            rows={5}
                            count={255}
                            onChange={(val) => this.props.setItemRemark(val)}
                            clear
                        />

                    </List>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountItem: state.accountItem,
        expenditureCategories: state.entities.expenditure_categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setItemAmount: (amount) => {
            dispatch(setItemAmount(amount));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenditure);