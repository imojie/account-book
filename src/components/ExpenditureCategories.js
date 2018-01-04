import React, {Component} from 'react';
import {List, NavBar, Icon} from 'antd-mobile';
import axios from 'axios';
import config from '../config/config.json';
import {connect} from 'react-redux';
import {setExpenditureCategories} from "../actions/categories";
import {setItemExpenditureCategory} from "../actions/item";

import '../style/category.css';

class ExpenditureCategories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedParentId: 0
        };
    }

    componentWillMount() {
        let _self = this;

        let localUser = localStorage.getItem('user');
        let user = localUser ? JSON.parse(localUser) : {};
        let accessToken = '';
        if (user && user.token && user.token.access_token) {
            accessToken = user.token.access_token;
        }
        if (!accessToken) {
            return;
        }

        let instance = axios.create({
            baseURL: config.api_url,
            timeout: 3000,
            headers: {'Authorization': 'Bearer ' + accessToken}
        });
        instance.get('account-items/categories?type=2')
            .then(function (response) {
                console.log(response);
                _self.props.setExpenditureCategories(response.data.data);
            })
            .catch(function (response) {
                if (response instanceof Error) {
                    console.log('Error', response);
                } else {
                    console.log(response);
                }
            });
    }

    switchParentCategory(index) {
        this.setState({selectedParentId: index});
    }


    clickChildCategory(index) {
        this.props.setItemExpenditureCategory(index);
        this.props.history.goBack();
    }

    render() {
        let selectedParentId = this.state.selectedParentId;
        let categories = this.props.categories;
        let parentCategoryComponents = [];
        let childCategoryComponents = [];

        if (0 == selectedParentId && Object.keys(categories).length > 0) {
            selectedParentId = Object.keys(categories)[0];
        }

        for (let id in categories) {
            parentCategoryComponents.push(
                <List.Item
                    key={id}
                    onClick={this.switchParentCategory.bind(this, id)}
                >{categories[id].name}</List.Item>
            );
        }

        if (categories.hasOwnProperty(selectedParentId)) {
            let childCategories = categories[selectedParentId]['children'];
            for (let cid in childCategories) {
                childCategoryComponents.push(
                    <List.Item
                        key={cid}
                        onClick={this.clickChildCategory.bind(this, cid)}
                    >{childCategories[cid].name}</List.Item>
                );
            }
        }

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >选择支出类型</NavBar>

                <div className="expenditure-categories">
                    <div className="parent-categories">
                        <List>{parentCategoryComponents}</List>
                    </div>
                    <div className="children-categories">
                        <List>{childCategoryComponents}</List>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.entities.expenditure_categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setExpenditureCategories: (categories) => {
            dispatch(setExpenditureCategories(categories));
        },
        setItemExpenditureCategory: (category) => {
            dispatch(setItemExpenditureCategory(category));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenditureCategories);