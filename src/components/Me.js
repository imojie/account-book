import React, {Component} from 'react';
import {
    WingBlank,
    WhiteSpace,
    NavBar,
    List,
    Button
} from 'antd-mobile';

const Item = List.Item;

class Me extends Component {
    render() {
        return (
            <div>
                <NavBar mode="dark">我</NavBar>

                <WhiteSpace/>

                <div className="user_head">
                    <div><img src={require('../img/head.jpeg')}/></div>
                    <div><span>Mr_Jing</span></div>
                </div>

                <WhiteSpace/>

                <List>
                    <Item arrow="horizontal">修改密码</Item>
                </List>

                <WhiteSpace/>

                <List>
                    <Item>当前版本：0.1.0</Item>
                </List>

                <WhiteSpace size="lg"/>

                <WingBlank size="lg">
                    <Button type="warning">退出登录</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Me;