import React, {Component} from 'react';
import {ListView, NavBar} from 'antd-mobile';
import AccountItem from './AccountItem';
import axios from 'axios';

import '../style/items.css';
import {connect} from "react-redux";
import {initItem} from "../actions/item";

function getAccessToken() {
    let localUser = localStorage.getItem('user');
    let user = localUser ? JSON.parse(localUser) : {};
    let accessToken = '';
    if (user && user.token && user.token.access_token) {
        accessToken = user.token.access_token;
    }
    if (!accessToken) {
        return null;
    }
    return accessToken;
}

function getAccountItems(page) {
    let accessToken = getAccessToken();
    console.log(`page:${page}`);

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 3000,
        headers: {'Authorization': `Bearer ${accessToken}`}
    });
    return instance.get(`account-books/22/items?page=${page}`)
        .then(function (response) {
            // console.log(response.data.data);

            return response.data.data;
        }).catch(function (response) {
            if (response instanceof Error) {
                console.log('Error', response.message, response.response);
            } else {
                console.log(response.data);
                console.log(response.status);
                console.log(response.headers);
                console.log(response.config);
            }
        });
}

class AccountItems extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.page = 1;
        this.maxPage = 1;

        this.rData = {};
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.rData),
            isLoading: true,
        };
    }

    componentWillMount() {
        this.getItems();
    }

    mergeItems(items1, items2) {
        let retItems = Object.assign({}, items1);
        for (let prop in items2) {
            if (retItems.hasOwnProperty(prop) && Array.isArray(retItems[prop]) && Array.isArray(items2[prop])) {
                retItems[prop] = retItems[prop].concat(items2[prop]);
            } else {
                retItems[prop] = items2[prop];
            }
        }
        return retItems;
    }

    getItems() {
        let _self = this;
        let p = getAccountItems(this.page);
        p.then(function (data) {
            let accountItems = data.data;
            _self.rData = _self.mergeItems(_self.rData, accountItems);
            _self.page += 1;
            _self.maxPage = data.last_page;
            _self.setState({
                dataSource: _self.state.dataSource.cloneWithRowsAndSections(_self.rData),
                isLoading: false
            });
        });
    }

    onEndReached = (event) => {
        console.log('onEndReached');
        let _self = this;

        if (this.state.isLoading || this.page > this.maxPage) {
            console.log('over');
            return;
        }
        this.setState({isLoading: true});

        this.getItems();
    };

    render() {

        const row = (rowData, sectionID, rowID) => {
            // console.log('rowData:', rowData, 'sectionID:', sectionID, 'rowID:', rowID, rowData.id);
            return <AccountItem
                rowID={rowID}
                accountItem={rowData}
                onClick={() => {
                    this.props.initItem();
                    this.props.history.push(`/edit-account-item/${rowData.id}`);
                }}/>;
        };

        const section = (sectionData, sectionID) => {
            // console.log('sectionData:', sectionData, 'sectionID', sectionID);
            return <div>{sectionID}</div>
        };

        return (
            <div>
                <NavBar
                    mode="dark"
                    onLeftClick={() => this.props.history.goBack()}>明细</NavBar>

                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSectionHeader={section}
                    className="am-list"
                    useBodyScroll
                    initialListSize={16}
                    scrollEventThrottle={200}
                    stickyHeader
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={50}
                />
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
export default connect(null, mapDispatchToProps)(AccountItems);