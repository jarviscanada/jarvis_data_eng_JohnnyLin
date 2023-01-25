const router = require('express').Router();
const { AccountTransaction } = require('../../models');

router.get('/transactionHistory/:traderId', (req, res) => {
    AccountTransaction.findAll({
        where: {
            trader_id: req.params.traderId
        }
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/accountBalance/:traderId', (req, res) => {
    AccountTransaction.sum('amount', {
        where: {
            trader_id: req.params.traderId
        }
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/deposit/:traderId', (req, res) => {
    AccountTransaction.create({
        amount : req.body.amount,
        trader_id: req.params.traderId
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/withdraw/:traderId', (req, res) => {
    AccountTransaction.create({
        amount: (req.body.amount * -1),
        trader_id: req.params.traderId
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;