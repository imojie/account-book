import React, {Component} from 'react';
import {
    List,
    InputItem,
    Button,
    DatePicker,
    TextareaItem,
} from 'antd-mobile';
import {connect} from "react-redux";
import {getAccountNameById} from "../services/account";

class EditIncome extends Component {
    componentWillMount() {
        console.log('EditIncome.props', this.props);
    }

    render() {
        let {amount, remark, occurred_at} = this.props.accountItem;

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
                        >收入金额</InputItem>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/income-categories')}
                        >收入类型</List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/accounts?from=income')}
                            extra={getAccountNameById(this.props.accounts, this.props.accountItem.account)}
                        >收入账户</List.Item>

                        <DatePicker
                            mode="datetime"
                            value={occurred_at}
                            onChange={(date) => this.props.setItemOccurredAt(date)}
                        >
                            <List.Item
                                arrow="horizontal">收入时间</List.Item>
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
        accountItem: state.accountItem
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIncome);