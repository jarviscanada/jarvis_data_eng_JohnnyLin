const router = require('express').Router();
const { Quote } = require('../../models');
// const sequelize = require('../../config/connection');    // for raw SQL statements

router.get('/dailyList', (req, res) => {
    Quote.findAll({
        order: [['created_at', 'DESC']]
    })
    .then(dbQuoteData => res.json(dbQuoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:quoteId', (req, res) => {
    Quote.findByPk(req.params.quoteId)
    .then(dbQuoteData => res.json(dbQuoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;


// Using raw SQL queries
/*
router.get('/dailyList', (req, res) => {
    sequelize.query('SELECT * FROM quote', {
        type: sequelize.QueryTypes.SELECT
    })
    .then(dbQuoteData => res.json(dbQuoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:quoteId', (req, res) => {
    sequelize.query('SELECT * FROM quote WHERE ticker = :quoteId', {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
            quoteId: req.params.quoteId
        }
    })
    .then(dbQuoteData => res.json(dbQuoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
*/