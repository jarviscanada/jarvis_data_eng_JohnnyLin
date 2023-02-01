// import all models
const Quote = require('./Quote');
const Trader = require('./Trader');
const AccountTransaction = require('./AccountTransaction');

// TODO: implement the necessary ORM relationships
Trader.hasMany(AccountTransaction, {
    foreignKey: 'trader_id',
    as: 'account_transaction'
});

AccountTransaction.belongsTo(Trader, {
    foreignKey: 'trader_id',
    as: 'trader'
});

module.exports = { Quote, Trader, AccountTransaction };