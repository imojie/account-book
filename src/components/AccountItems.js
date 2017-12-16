import React, {Component} from 'react';
import {ListView, NavBar, PullToRefresh, Icon} from 'antd-mobile';
import AccountItem from './AccountItem';
import axios from 'axios';

import '../style/items.css';
import {connect} from "react-redux";
import {initItem} from "../actions/item";
import {StickyContainer, Sticky} from 'react-sticky';
import {initAccountItems, setAccountItems, setAccountItemsUI} from "../actions/account_items";

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
            return response.data.data;
        }).catch(function (response) {
            if (response instanceof Error) {
                console.log('Error', response.message, response.response);
            } else {
                console.log(response);
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

        console.log(this.props.accountItems);

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.props.accountItems),
            isLoading: false,
            refreshing: false
        };
    }

    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {
        console.log('componentDidMount', this.props.scrollX, this.props.scrollY);
        this.lv.scrollTo(this.props.scrollX, this.props.scrollY);
    }

    componentWillUnmount() {
        this.props.setUI({scrollX: window.scrollX, scrollY: window.scrollY});
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
        if (this.state.isLoading || !this.props.hasMore) {
            console.log('over');
            return;
        }
        this.setState({isLoading: true});

        let self = this;
        let p = getAccountItems(this.props.page);
        p.then(function (data) {
            let accountItems = data.data;
            self.accountItems = self.mergeItems(self.props.accountItems, accountItems);

            console.log(self.mergeItems(self.props.accountItems, accountItems));

            self.props.setAccountItems(self.mergeItems(self.props.accountItems, accountItems));

            self.props.setUI({
                page: self.props.page + 1,
                hasMore: data.last_page > self.props.page
            });

            self.setState({
                dataSource: self.state.dataSource.cloneWithRowsAndSections(self.props.accountItems),
                isLoading: false
            });
        });
    }

    onRefresh = () => {
        console.log('onRefresh');

        this.setState({refreshing: true, isLoading: true});

        this.props.setUI({page: 1, hasMore: true});

        let self = this;
        let p = getAccountItems(this.props.page);
        p.then(function (data) {
            let accountItems = data.data;

            self.props.initAccountItems(accountItems);

            self.props.setUI({
                page: self.props.page + 1,
                hasMore: data.last_page > self.props.page
            });

            self.setState({
                dataSource: self.state.dataSource.cloneWithRowsAndSections(accountItems),
                refreshing: false,
                isLoading: false
            });
        });
    };

    onEndReached = (event) => {
        console.log('onEndReached');
        this.getItems();
    };

    render() {
        const row = (rowData, sectionID, rowID) => {
            return <AccountItem
                rowID={rowID}
                accountItem={rowData}
                onClick={() => {
                    this.props.initItem();
                    this.props.history.push(`/edit-account-item/${rowData.id}`);
                }}/>;
        };

        const section = (sectionData, sectionID) => {
            return (
                <Sticky>
                    {({style}) => (
                        <div
                            className="sticky"
                            style={{...style, zIndex: 3, backgroundColor: '#5890ff'}}
                        >{sectionID}</div>
                    )}
                </Sticky>
            );
        };

        const sectionWrapper = (sectionID) => {
            return (
                <StickyContainer
                    key={sectionID}
                    className="sticky-container"
                    style={{zIndex: 4}}
                />
            );
        };

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                >明细</NavBar>

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    className="am-list sticky-list"
                    useBodyScroll

                    initialListSize={15}
                    renderFooter={() => (<div style={{padding: '5px', textAlign: 'center'}}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}

                    renderSectionWrapper={sectionWrapper}
                    renderSectionHeader={section}
                    renderRow={row}

                    pageSize={5}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={100}

                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountItems: state.entities.account_items,
        ...state.ui.account_item_page
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initItem: () => {
            dispatch(initItem());
        },
        setAccountItems: (accountItems) => {
            dispatch(setAccountItems(accountItems));
        },
        initAccountItems: (accountItems) => {
            dispatch(initAccountItems(accountItems));
        },
        setUI: (ui) => {
            dispatch(setAccountItemsUI(ui));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountItems);