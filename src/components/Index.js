import React from 'react';
import {Link} from 'react-router-dom';

class Index extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <button onClick={() => {
                        // 初始化 accountItem
                        this.props.initItem();
                        this.props.history.push('/edit-account-item');
                    }}>记一笔
                    </button>
                </div>
                <div>
                    <Link to='account-items'>明细</Link>
                </div>
                <div>
                    <Link to='passport/login'>登录</Link>
                </div>
            </div>
        );
    }

}

export default Index;