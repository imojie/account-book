import React, {Component} from 'react';
import {
    WingBlank,
    WhiteSpace,
    NavBar,
    SegmentedControl,
    Button,
    ActivityIndicator,
    Modal,
    Icon
} from 'antd-mobile';
import EditExpenditure from './EditExpenditure';
import EditIncome from './EditIncome';
import EditTransfer from "./EditTransfer";
import EditLoan from "./EditLoan";
import {connect} from "react-redux";
import {setItem, setItemType, setItemAmount, setItemOccurredAt, setItemRemark} from "../actions/item";
import {initItemState} from "../reducers/item";
import {deleteAccountItem, getAccountItem, saveAccountItem} from "../services/account_item";
import moment from 'moment';
import 'moment/locale/zh-cn';

class EditAccountItem extends Component {
    constructor() {
        super();

        this.accountItemTypes = ['支出', '收入', '转账', '借贷'];

        this.accountItemComponents = [
            EditExpenditure,
            EditIncome,
            EditTransfer,
            EditLoan
        ];

        this.state = {
            isLoading: true
        }
    }

    getSegmentIndex() {
        const mapTypesToIndexes = {
            "1": 1,
            "2": 0,
            "3": 2,
            "4": 3,
        };
        let index = mapTypesToIndexes[this.props.accountItem.type];
        console.log('getSegmentIndex:', index);
        return index;
    }

    getTypeBySegmentIndex(segmentIndex) {
        const mapIndexesToTypes = {
            "1": 1,
            "0": 2,
            "2": 3,
            "3": 4
        };
        return mapIndexesToTypes[segmentIndex];
    }

    componentWillMount() {
        console.log('EditAccountItem.props', this.props);
        console.log('id', this.props.match.params.id);

        const id = this.props.match.params.id;
        const self = this;
        if (!this.props.accountItem.occurred_at) {
            const zhNow = moment().locale('zh-cn').utcOffset(8);
            this.props.setItemOccurredAt(zhNow);
        }
        if (id) {
            if (this.props.accountItem.id === id) {
                // 不需要从网络获取
                self.setState({isLoading: false});
            } else {
                // 从网络获取
                getAccountItem(id).then(function (data) {
                    console.log(data);
                    if (2 == data.type) {
                        self.props.setItem({
                            id: id,
                            type: 2,
                            amount: data.amount,
                            remark: String(data.remark),
                            occurred_at: moment(data.occurred_at),
                            account: data.from_account_id,
                            expenditure_category: data.category_id,
                        });
                    }
                    self.setState({isLoading: false});
                });
            }
        } else {
            self.setState({isLoading: false});
        }
    }

    onClickAccount() {
    }


    handleSwitchSegmentedControl(e) {
        let type = this.getTypeBySegmentIndex(e.nativeEvent.selectedSegmentIndex);
        console.log('getTypeBySegmentIndex', type);
        this.props.setItemType(type);
    }

    handleClickDelete() {
        let self = this;

        Modal.alert('', '确认删除该记录？', [
            {text: '取消'},
            {
                text: '确认',
                onPress: () => {
                    deleteAccountItem(self.props.accountItem.id).then(function (res) {
                        if (0 == res.code) {
                            self.props.setItem(initItemState);
                            self.props.history.goBack();
                        }
                    });
                }
            },
        ]);
    }

    handleClickSaveAndQuit() {
        let self = this;
        saveAccountItem(this.props.accountItem).then(function (res) {
            if (0 == res.code) {
                self.props.setItem(initItemState);
                self.props.history.goBack();
            }
        });
    }

    handleClickSaveAndReset() {
        let self = this;
        saveAccountItem(this.props.accountItem).then(function (res) {
            if (0 == res.code) {
                self.props.setItemAmount("0");
            }
        });
    }

    render() {
        const EditComponent = this.accountItemComponents[this.getSegmentIndex()];

        return (
            <div>

                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >记账</NavBar>

                {this.state.isLoading ?
                    <div>
                        <ActivityIndicator toast={true} text="正在加载"/>
                    </div> :

                    <div className="edit-account-item">
                        <WingBlank size="md">
                            <WhiteSpace size="md"/>

                            <SegmentedControl
                                values={this.accountItemTypes}
                                selectedIndex={this.getSegmentIndex()}
                                onChange={this.handleSwitchSegmentedControl.bind(this)}
                            />

                            <WhiteSpace size="md"/>

                            <EditComponent
                                history={this.props.history}
                                accountItem={this.props.accountItem}
                                setItemAmount={this.props.setItemAmount}
                                setItemOccurredAt={this.props.setItemOccurredAt}
                                setItemRemark={this.props.setItemRemark}
                                onClickAccount={this.onClickAccount}
                                accounts={this.props.accounts}
                            />

                            <div className="save-btn">
                                {this.props.accountItem.id ?
                                    <Button type="warning" size="lg"
                                            onClick={this.handleClickDelete.bind(this)}>删除</Button>
                                    :
                                    <Button type="primary" size="lg"
                                            onClick={this.handleClickSaveAndReset.bind(this)}>保存再记</Button>
                                }

                                <WhiteSpace size="md"/>

                                <Button type="primary" size="lg"
                                        onClick={this.handleClickSaveAndQuit.bind(this)}>保存</Button>

                                <WhiteSpace size="md"/>
                            </div>

                        </WingBlank>
                    </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountItem: state.accountItem,
        accounts: state.entities.accounts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setItem: (item) => {
            dispatch(setItem(item));
        },
        setItemType: (type) => {
            dispatch(setItemType(type));
        },
        setItemAmount: (amount) => {
            dispatch(setItemAmount(amount));
        },
        setItemRemark: (remark) => {
            dispatch(setItemRemark(remark));
        },
        setItemOccurredAt: (occurredAt) => {
            dispatch(setItemOccurredAt(occurredAt));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountItem);