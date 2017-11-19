import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import Index from './Index';
import AccountItems from './AccountItems';
import AccountList from './AccountList';
import Me from './Me';

class AppTabBar extends Component {
    render() {
        const pathname = this.props.history.location.pathname;

        const items = [
            {
                uri: '/',
                title: "记账",
                key: "index",
                icon: require('../img/user.svg'),
                selectedIcon: require('../img/user_selected.svg'),
                component: Index,
            },
            {
                uri: '/account-items',
                title: "明细",
                key: "account-items",
                icon: require('../img/user.svg'),
                selectedIcon: require('../img/user_selected.svg'),
                component: AccountItems,
            },
            {
                uri: '/accounts',
                title: "账户",
                key: "accounts",
                icon: require('../img/user.svg'),
                selectedIcon: require('../img/user_selected.svg'),
                component: AccountList,
            },
            {
                uri: '/me',
                title: "我",
                key: "me",
                icon: require('../img/user.svg'),
                selectedIcon: require('../img/user_selected.svg'),
                component: Me,
            },
        ];

        return (
            <div className="full-screen">
                <TabBar>
                    {items.map((item) => {
                        return (
                            <TabBar.Item
                                title={item.title}
                                key={item.key}
                                selected={pathname === item.uri}
                                icon={item.icon}
                                selectedIcon={item.selectedIcon}
                                onPress={() => {
                                    if (!(pathname === item.uri)) {
                                        this.props.history.push(item.uri);
                                    }
                                }}
                            >
                                {pathname === item.uri ? <item.component history={this.props.history}/> : null}
                            </TabBar.Item>
                        )
                    })}
                </TabBar>
            </div>
        );
    }
}

export default AppTabBar;