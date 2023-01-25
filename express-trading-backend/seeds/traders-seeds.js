const { Trader } = require('../models');

const traderData = [
    {
        first_name: 'Trader',
        last_name: 'Joe',
        email: 'joe@trader.ca',
        dob: Date.now(),
        country: 'Canada'
    },
    {
        first_name: 'Biddy',
        last_name: 'McBidface',
        email: 'bid@biddy.ca',
        dob: Date.now(),
        country: 'USA'
    }
]

const seedTraders = () => Trader.bulkCreate(traderData);

module.exports = seedTraders;