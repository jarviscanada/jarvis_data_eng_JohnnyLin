const router = require('express').Router();

const traderRoutes = require('./trader-routes.js');
const quoteRoutes = require('./quote-routes');
const accountRoutes = require('./account-routes')


router.use('/traders', traderRoutes);
router.use('/quote', quoteRoutes);
router.use('/account', accountRoutes);

module.exports = router;