const seedQuotes = require('./quotes-seeds');
const seedTraders = require('./traders-seeds');
const seedAccountTransaction = require('./transactions-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');

    await seedQuotes();
    console.log('--------------');

    await seedTraders();
    console.log('--------------');

    await seedAccountTransaction();
    console.log('--------------');
    
    process.exit(0);
};

seedAll();