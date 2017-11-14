import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUser} from "../actions/user";
import {login} from '../services/user';
import {List, InputItem, Button} from 'antd-mobile';

const Item = List.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: 'u22@i.com',
            password: '123456',
            isLoading: false
        }
    }


    handleLoginClick(e) {
        const self = this;

        this.setState({isLoading: true});

        login(this.state.account, this.state.password).then(function (response) {
            self.setState({isLoading: false});

            const content = response.data;
            if (0 === content.code) {
                let user = content.data.user;
                user.token = content.data.token;
                self.props.setUser(user);
                self.props.history.push('/');
            } else {
                alert(content.message);
            }
        }).catch(function (response) {
            self.setState({isLoading: false});
            console.log(response);
        });
    }

    render() {
        return (
            <div>
                <form>
                    <List renderHeader={() => '登录账号'}>
                        <InputItem
                            type="text"
                            value={this.state.account}
                            clear
                            placeholder="请输入账号"
                        >帐号</InputItem>

                        <InputItem
                            type="password"
                            value={this.state.password}
                            clear
                            placeholder="请输入密码"
                        >密码</InputItem>

                        <Item>
                            <Button
                                disabled={this.state.isLoading}
                                loading={this.state.isLoading}
                                type="primary"
                                size="large"
                                onClick={this.handleLoginClick.bind(this)}>登录</Button>
                        </Item>
                    </List>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch(setUser(user));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);