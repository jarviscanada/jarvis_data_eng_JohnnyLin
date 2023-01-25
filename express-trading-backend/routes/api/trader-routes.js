const router = require('express').Router();
const { Trader } = require('../../models');

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
        })
});

router.delete('/:traderId', (req, res) => {
    Trader.destroy({
        where: { id: req.params.traderId }
    })
        .then(dbTraderData => res.json(dbTraderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;