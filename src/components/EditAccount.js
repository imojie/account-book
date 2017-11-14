import React, {Component} from 'react';
import {
    List,
    InputItem,
    Radio,
    WhiteSpace,
    NavBar,
    Button
} from 'antd-mobile';
import {connect} from 'react-redux';
import {setItemType} from '../actions/item';

const RadioItem = Radio.RadioItem;

class EditAccount extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {
        console.log('EditAccount.props', this.props);
    }


    render() {
        const accountTypes = [
            {value: 1, label: '现金', extra: '零花钱、私房钱'},
            {value: 2, label: '储蓄卡', extra: '借记卡、存折'},
            {value: 3, label: '信用卡', extra: '信用卡、蚂蚁花呗、京东白条'},
            {value: 4, label: '网络账户', extra: '支付宝、微信零钱、财付通'},
        ];
        return (
            <div>

                <NavBar
                    mode="dark"
                    onLeftClick={() => {
                    }}>添加账户</NavBar>

                <div className="edit-account-item">
                    <form>
                        <WhiteSpace size="lg"/>

                        <List>
                            <InputItem
                                type="text"
                                clear
                                maxLength={20}
                                value={''}
                            >账户名</InputItem>
                        </List>

                        <WhiteSpace size="lg"/>

                        <List renderHeader={() => '账户类型'}>
                            {accountTypes.map(type => (
                                <RadioItem
                                    key={type.value}
                                >
                                    {type.label}
                                    <List.Item.Brief>{type.extra}</List.Item.Brief>
                                </RadioItem>
                            ))}
                        </List>

                        <WhiteSpace size="lg"/>

                        <List>
                            <InputItem
                                type="money"
                                clear
                                value={'0'}
                            >金额</InputItem>
                        </List>

                        <WhiteSpace size="lg"/>

                        <Button className="save_account_btn" type="primary">保存</Button>
                    </form>
                </div>
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
    return {
        setItemType: (type) => {
            dispatch(setItemType(type));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);