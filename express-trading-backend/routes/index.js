const router = require('express').Router();

router.use((req, res) => {
  res.json({ message: "hello world" })
});

module.exports = router;