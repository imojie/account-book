import React, {Component} from 'react';
import {List, NavBar} from 'antd-mobile';

class IncomeCategories extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const categories = [
            {
                id: 1,
                name: '薪水',
            },
            {
                id: 2,
                name: '奖金',
            },
            {
                id: 3,
                name: '兼职',
            },
            {
                id: 4,
                name: '红包',
            },
        ];

        return (
            <div>
                <NavBar
                    mode="dark"
                    onLeftClick={() => {
                    }}>收入类型</NavBar>

                <div>
                    <List>
                        {categories.map((category) => {
                            return <List.Item key={category.id}>{category.name}</List.Item>
                        })}
                    </List>
                </div>
            </div>
        );
    }
}

export default IncomeCategories;