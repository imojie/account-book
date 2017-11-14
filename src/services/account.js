export const getAccountNameById = (accounts, accountId) => {
    const account = accounts[accountId];
    if (typeof account === 'object' && account.hasOwnProperty('name')) {
        return account.name;
    }
    return '';
};
