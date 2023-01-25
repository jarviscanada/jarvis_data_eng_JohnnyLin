const { AccountTransaction } = require('../models');

const accountTransactionData = [
    {
        id: 1,
        amount: 10,
        trader_id: 1 
    },
    {
        id: 2,
        amount: 10,
        trader_id: 1
    },
    {
        id: 3,
        amount: -5,
        trader_id: 1
    },
    {
        id: 4,
        amount: 10,
        trader_id: 2
    },
    {
        id: 5,
        amount: -5,
        trader_id: 2
    },
    {
        id: 6,
        amount: 25,
        trader_id: 2
    },
    {
        id: 7,
        amount: 155,
        trader_id: 1
    },
    {
        id: 8,
        amount: 155,
        trader_id: 1
    },
    {
        id: 9,
        amount: -300,
        trader_id: 1
    },
    {
        id: 10,
        amount: 300,
        trader_id: 1
    }
];

const seedAccountTransaction = () => AccountTransaction.bulkCreate(accountTransactionData);

module.exports = seedAccountTransaction;