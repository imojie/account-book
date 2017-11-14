import React, {Component} from 'react';
import {
    Tag,
    List,
    InputItem,
    Button,
    DatePicker,
    TextareaItem,
} from 'antd-mobile';

import moment from 'moment';
import 'moment/locale/zh-cn';


class EditLoan extends Component {

    componentWillMount() {
        console.log('EditLoan.props', this.props);
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
                            autoFocus={0 == amount}
                            placeholder="请输入金额"
                            onChange={(val) => this.props.setItemAmount(val)}
                            clear
                        >借贷金额</InputItem>

                        <List.Item>
                            借贷类型
                            <div className="loan_categoires">
                                <List.Item.Brief>
                                    <Tag selected>借入</Tag>
                                    <Tag>借出</Tag>
                                    <Tag>还款</Tag>
                                    <Tag>收款</Tag>
                                </List.Item.Brief>
                            </div>
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            // onClick={this.jumpAccountView.bind(this)}
                        >from账户</List.Item>

                        <List.Item
                            arrow="horizontal"
                            // onClick={this.jumpAccountView.bind(this)}
                        >to账户</List.Item>

                        <DatePicker
                            mode="datetime"
                            extra={occurred_at.format('YYYY-MM-DD HH:mm')}
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

export default EditLoan;