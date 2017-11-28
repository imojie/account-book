import React, {Component} from 'react';
import {
    Tag,
    List,
    InputItem,
    DatePicker,
    TextareaItem,
} from 'antd-mobile';
import '../style/category.css';
import {setItemTransferCategory} from "../actions/item";
import {connect} from "react-redux";
import {getAccountNameById} from "../services/account";

class EditTransfer extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        console.log(this.props);
    }

    render() {
        let {amount, remark, occurred_at} = this.props.accountItem;

        const transferCategories = {
            "1": "互转",
            "2": "还信用卡",
            "3": "取钱",
            "4": "存钱",
        };

        let transferCategoriesComponents = [];
        for (let id in transferCategories) {
            transferCategoriesComponents.push(
                <Tag
                    key={id}
                    selected={id == this.props.transferCategory}
                    onChange={() => this.props.setItemTransferCategory(id)}
                >{transferCategories[id]}</Tag>
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
                        >转账金额</InputItem>

                        <List.Item>
                            转账类型
                            <div className="transfer_categories">
                                <List.Item.Brief>{transferCategoriesComponents}</List.Item.Brief>
                            </div>
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/accounts?from=transfer_from_account')}
                            extra={getAccountNameById(this.props.accounts, this.props.accountItem.transfer_from_account)}
                        >转出账户</List.Item>

                        <List.Item
                            arrow="horizontal"
                            onClick={() => this.props.history.push('/accounts?from=transfer_to_account')}
                            extra={getAccountNameById(this.props.accounts, this.props.accountItem.transfer_to_account)}
                        >转入账户</List.Item>

                        <DatePicker
                            mode="datetime"
                            value={occurred_at}
                            onChange={(date) => this.props.setItemOccurredAt(date)}
                        >
                            <List.Item
                                arrow="horizontal">转账时间</List.Item>
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
        transferCategory: state.accountItem.transfer_category,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setItemTransferCategory: (categoryId) => {
            dispatch(setItemTransferCategory(categoryId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTransfer);