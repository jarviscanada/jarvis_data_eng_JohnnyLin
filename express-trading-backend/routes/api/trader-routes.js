const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.post('/', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

router.delete('/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" });
});

module.exports = router;