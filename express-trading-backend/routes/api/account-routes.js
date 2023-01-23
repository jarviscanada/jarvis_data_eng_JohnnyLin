const router = require('express').Router();

router.get('/transactionHistory/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.get('/accountBalance/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.post('/deposit/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.post('/withdraw/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

module.exports = router;