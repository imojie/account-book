import React, {Component} from 'react';
import {
    WingBlank,
    WhiteSpace,
    NavBar,
    List,
    InputItem,
    Button
} from 'antd-mobile';

class UpdatePassword extends Component {
    render() {
        return (
            <div>
                <NavBar mode="dark">修改密码</NavBar>

                <WhiteSpace/>

                <form>
                    <List>
                        <InputItem
                            type="password"
                            clear
                            placeholder="必填"
                        >原密码</InputItem>

                        <InputItem
                            type="password"
                            clear
                            placeholder="必填"
                        >新密码</InputItem>

                        <InputItem
                            type="password"
                            clear
                            placeholder="必填"
                        >确认新密码</InputItem>
                    </List>

                    <WhiteSpace size="lg"/>

                    <WingBlank size="lg">
                        <Button type="primary">保存</Button>
                    </WingBlank>
                </form>
            </div>
        );
    }
}

export default UpdatePassword;