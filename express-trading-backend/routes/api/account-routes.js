const router = require('express').Router();
const { AccountTransaction } = require('../../models');
// const sequelize = require('../../config/connection');    // for raw SQL statements

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


// Using raw SQL queries
/*
router.get('/transactionHistory/:traderId', (req, res) => {
    sequelize.query('SELECT * FROM account_transaction WHERE trader_id = :traderId', {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
            traderId: req.params.traderId
        }
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/accountBalance/:traderId', (req, res) => {
    sequelize.query('SELECT SUM(amount) AS `balance` FROM account_transaction WHERE trader_id = :traderId', {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
            traderId: req.params.traderId
        }
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/deposit/:traderId', (req, res) => {
    sequelize.query('INSERT INTO account_transaction (amount, trader_id, created_at, updated_at) VALUES (:amount, :traderId, STR_TO_DATE(:createdAt, "%Y-%m-%d %T"), STR_TO_DATE(:updatedAt, "%Y-%m-%d %T"))', {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
            amount: req.body.amount,
            traderId: req.params.traderId,
            createdAt: new Date().toISOString().substring(0, 19).replace('T', ' '), 
            updatedAt: new Date().toISOString().substring(0, 19).replace('T', ' ')
        }
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/withdraw/:traderId', (req, res) => {
    sequelize.query('INSERT INTO account_transaction (amount, trader_id, created_at, updated_at) VALUES (:amount, :traderId, STR_TO_DATE(:createdAt, "%Y-%m-%d %T"), STR_TO_DATE(:updatedAt, "%Y-%m-%d %T"))', {
        type: sequelize.QueryTypes.INSERT,
        replacements: {
            amount: req.body.amount * -1,
            traderId: req.params.traderId,
            createdAt: new Date().toISOString().substring(0, 19).replace('T', ' '), 
            updatedAt: new Date().toISOString().substring(0, 19).replace('T', ' ')
        }
    })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
*/