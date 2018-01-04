import React, {Component} from 'react';
import {List, NavBar, Icon} from 'antd-mobile';
import Account from './Account';
import {connect} from 'react-redux';

class Accounts extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }


    render() {
        let accounts = [];
        for (let id in this.props.accounts) {
            let account = this.props.accounts[id];
            accounts.push(
                <Account
                    id={account.id}
                    key={account.id}
                    // onClick={this.handleClick.bind(this, id)}
                    account={account}
                />
            );
        }

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="0" type="plus" onClick={() => {
                            this.props.history.push('/edit-account');
                        }}/>,
                    ]}
                >选择账户</NavBar>
                {Object.keys(this.props.accounts).length > 0 ? (<List>{accounts}</List>) : (<div>暂无账号</div>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.entities.accounts
    }
};


export default connect(mapStateToProps, null)(Accounts);
