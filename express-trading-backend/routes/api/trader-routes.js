const router = require('express').Router();
const { Trader } = require('../../models');
// const sequelize = require('../../config/connection');    // for raw SQL statements

router.get('/', (req, res) => {
    Trader.findAll()
    .then(dbTraderData => res.json(dbTraderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Trader.create(req.body)
    .then(dbTraderData => res.json(dbTraderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:traderId', (req, res) => {
    Trader.destroy({
        where: { id: req.params.traderId }
    })
    .then(dbTraderData => res.json(dbTraderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;


// Using raw SQL queries
/*
router.get('/', (req, res) => {
    sequelize.query('SELECT * FROM trader', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(dbTraderData => res.json(dbTraderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    sequelize.query('INSERT INTO trader (first_name, last_name, email, dob, country) VALUES (:first_name, :last_name, :email, STR_TO_DATE(:dob, "%M %d, %Y"), :country)', {
        type: sequelize.QueryTypes.INSERT,
        replacements: req.body
    })
    .then(dbTraderData => res.json(dbTraderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:traderId', (req, res) => {
    sequelize.query('DELETE FROM trader WHERE id = :traderId', {
        type: sequelize.QueryTypes.DELETE,
        replacements: {
            traderId: req.params.traderId
        }
    })
    .then(dbTraderData => res.json(dbTraderData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
*/