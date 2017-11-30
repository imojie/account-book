import axios from 'axios';
import {getAccessToken} from "./user";
import moment from 'moment';
import 'moment/locale/zh-cn';

export function getAccountItem(id) {
    let accessToken = getAccessToken();

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 2000,
        headers: {'Authorization': `Bearer ${accessToken}`}
    });
    return instance.get(`account-items/${id}`)
        .then(function (response) {
            console.log(response);

            return response.data.data;
        }).catch(function (response) {
            if (response instanceof Error) {
                console.log('Error', response.message, response.response);
            } else {
                console.log(response);
            }
        });
}

function saveExpenditure(accountItem) {
    const accessToken = getAccessToken();

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 2000,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    let postData = {
        account_book_id: 22,
        type: accountItem.type,
        amount: accountItem.amount,
        from_account_id: accountItem.account,
        category_id: accountItem.expenditure_category,
        remark: accountItem.remark,
        occurred_at: moment(accountItem.occurred_at).format('YYYY-MM-DD HH:mm:ss')
    };

    let config = {
        url: "account-items",
        method: "post",
        data: postData
    };

    if (accountItem.id) {
        config = {
            url: `account-items/${accountItem.id}`,
            method: "put",
            data: postData
        }
    }

    return instance.request(config).then(function (response) {
        return response.data;
    }).catch(function (response) {
        if (response instanceof Error) {
            console.log('Error', response.message, response.response);
        } else {
            console.log(response);
        }
    });
}

function saveIncome(accountItem) {
    const accessToken = getAccessToken();

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 2000,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    let postData = {
        account_book_id: 22,
        type: accountItem.type,
        amount: accountItem.amount,
        to_account_id: accountItem.account,
        category_id: accountItem.income_category,
        remark: accountItem.remark,
        occurred_at: moment(accountItem.occurred_at).format('YYYY-MM-DD HH:mm:ss')
    };

    let config = {
        url: "account-items",
        method: "post",
        data: postData
    };

    if (accountItem.id) {
        config = {
            url: `account-items/${accountItem.id}`,
            method: "put",
            data: postData
        }
    }

    return instance.request(config).then(function (response) {
        return response.data;
    }).catch(function (response) {
        if (response instanceof Error) {
            console.log('Error', response.message, response.response);
        } else {
            console.log(response);
        }
    });
}

function saveTransfer(accountItem) {
    const accessToken = getAccessToken();

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 2000,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    let postData = {
        account_book_id: 22,
        type: accountItem.type,
        amount: accountItem.amount,
        from_account_id: accountItem.transfer_from_account,
        to_account_id: accountItem.transfer_to_account,
        category_id: accountItem.transfer_category,
        remark: accountItem.remark,
        occurred_at: moment(accountItem.occurred_at).format('YYYY-MM-DD HH:mm:ss')
    };

    let config = {
        url: "account-items",
        method: "post",
        data: postData
    };

    if (accountItem.id) {
        config = {
            url: `account-items/${accountItem.id}`,
            method: "put",
            data: postData
        }
    }

    return instance.request(config).then(function (response) {
        return response.data;
    }).catch(function (response) {
        if (response instanceof Error) {
            console.log('Error', response.message, response.response);
        } else {
            console.log(response);
        }
    });
}


function saveLoan(accountItem) {
    const accessToken = getAccessToken();

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 2000,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    let postData = {
        account_book_id: 22,
        type: accountItem.type,
        amount: accountItem.amount,
        from_account_id: accountItem.loan_from_account,
        to_account_id: accountItem.loan_to_account,
        category_id: accountItem.loan_category,
        remark: accountItem.remark,
        occurred_at: moment(accountItem.occurred_at).format('YYYY-MM-DD HH:mm:ss')
    };

    let config = {
        url: "account-items",
        method: "post",
        data: postData
    };

    if (accountItem.id) {
        config = {
            url: `account-items/${accountItem.id}`,
            method: "put",
            data: postData
        }
    }

    return instance.request(config).then(function (response) {
        return response.data;
    }).catch(function (response) {
        if (response instanceof Error) {
            console.log('Error', response.message, response.response);
        } else {
            console.log(response);
        }
    });
}

export function saveAccountItem(accountItem) {
    console.log(typeof accountItem.type);
    switch (accountItem.type) {
        case '1':
        case 1:
            return saveIncome(accountItem);
        case '2':
        case 2:
            return saveExpenditure(accountItem);
        case '3':
        case 3:
            return saveTransfer(accountItem);
        case '4':
        case 4:
            return saveLoan(accountItem);
        default:
            break;
    }
}

export function deleteAccountItem(id) {
    let accessToken = getAccessToken();

    let instance = axios.create({
        baseURL: 'http://account-book.app/api/',
        timeout: 2000,
        headers: {'Authorization': `Bearer ${accessToken}`}
    });
    return instance.delete(`account-items/${id}`)
        .then(function (response) {
            return response.data;
        }).catch(function (response) {
            if (response instanceof Error) {
                console.log('Error', response.message, response.response);
            } else {
                console.log(response);
            }
        });
}
