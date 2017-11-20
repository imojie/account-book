import React, {Component} from 'react';
import {List, NavBar, Icon} from 'antd-mobile';
import {setItemIncomeCategory} from "../actions/item";
import {connect} from "react-redux";

class IncomeCategories extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const categories = this.props.categories;
        let categoryComponents = [];
        for (let id in categories) {
            categoryComponents.push(
                <List.Item
                    key={id}
                    onClick={() => {
                        this.props.setItemIncomeCategory(id);
                        this.props.history.goBack();
                    }}
                >{categories[id].name}</List.Item>
            );
        }

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >选择收入类型</NavBar>

                <div>
                    <List>{categoryComponents}</List>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.entities.income_categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setItemIncomeCategory: (category) => {
            dispatch(setItemIncomeCategory(category));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeCategories);