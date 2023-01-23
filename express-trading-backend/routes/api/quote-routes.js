const router = require('express').Router();

router.get('/dailyList', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.get('/:quoteId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.delete('/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

module.exports = router;