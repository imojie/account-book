import React, {Component} from 'react';
import {initItem} from "../actions/item";
import {connect} from "react-redux";
import {TabBar} from 'antd-mobile';
import Me from './Me';
import Index from './Index';
import AccountList from './AccountList';
import AccountItems from './AccountItems';

class AccountBookApp extends Component {
    constructor() {
        super();

        this.state = {
            page: "index"
        }
    }

    render() {
        return (
            <div className="full-screen">
                <TabBar>
                    <TabBar.Item
                        title="记账"
                        key="index"
                        selected={'index' === this.state.page}
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        onPress={() => {
                            this.setState({page: "index"});
                        }}
                    >
                        <Index/>
                    </TabBar.Item>

                    <TabBar.Item
                        title="明细"
                        key="account-items"
                        selected={'account-items' === this.state.page}
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        onPress={() => {
                            this.setState({page: "account-items"});
                        }}
                    >
                        <AccountItems/>
                    </TabBar.Item>

                    <TabBar.Item
                        title="账户"
                        key="accounts"
                        selected={'accounts' === this.state.page}
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        onPress={() => {
                            this.setState({page: "accounts"});
                        }}
                    >
                        <AccountList/>
                    </TabBar.Item>

                    <TabBar.Item
                        title="我"
                        key="me"
                        selected={'me' === this.state.page}
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}/>
                        }
                        onPress={() => {
                            this.setState({page: "me"});
                        }}
                    >
                        <Me/>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        initItem: () => {
            dispatch(initItem());
        }
    };
};

export default connect(null, mapDispatchToProps)(AccountBookApp);