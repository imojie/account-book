import React, {Component} from 'react';
import {
    Tag,
    List,
    InputItem,
    DatePicker,
    TextareaItem,
} from 'antd-mobile';
import {connect} from "react-redux";
import {setItemLoanCategory} from "../actions/item";
import {getAccountNameById} from "../services/account";


class EditLoan extends Component {

    componentWillMount() {
        console.log('EditLoan.props', this.props);
    }

    render() {
        let {amount, remark, occurred_at} = this.props.accountItem;

        const loanCategories = {
            "1": "借入",
            "2": "借出",
            "3": "还款",
            "4": "收款",
        };

        let loanCategoriesComponents = [];
        for (let id in loanCategories) {
            loanCategoriesComponents.push(
                <Tag
                    key={id}
                    selected={id == this.props.accountItem.loan_category}
                    onChange={() => this.props.setItemLoanCategory(id)}
                >{loanCategories[id]}</Tag>
            );
        }


        return (
            <div>
                <form>
                    <List>
                        <InputItem
                            type="money"
                            value={amount}
                            placeholder="请输入金额"
                            onChange={(val) => this.props.setItemAmount(val)}
                            ref={(el) => {
                                if (el && !amount) {
                                    el.focus();
                                }
                            }}
                            clear
                        >借贷金额</InputItem>

                        <List.Item>
                            借贷类型
                            <div className="loan_categories">
                                <List.Item.Brief>{loanCategoriesComponents}</List.Item.Brief>
                            </div>
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/accounts?from=loan_from_account')}
                            extra={getAccountNameById(this.props.accounts, this.props.accountItem.loan_from_account)}
                        >from账户</List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/accounts?from=loan_to_account')}
                            extra={getAccountNameById(this.props.accounts, this.props.accountItem.loan_to_account)}
                        >to账户</List.Item>

                        <DatePicker
                            mode="datetime"
                            value={occurred_at}
                            onChange={(date) => this.props.setItemOccurredAt(date)}
                        >
                            <List.Item
                                arrow="horizontal">借贷时间</List.Item>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setItemLoanCategory: (categoryId) => {
            dispatch(setItemLoanCategory(categoryId));
        }
    }
};

export default connect(null, mapDispatchToProps)(EditLoan);