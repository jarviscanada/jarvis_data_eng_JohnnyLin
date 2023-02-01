const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AccountTransaction extends Model {}

AccountTransaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    trader_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'trader',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'account_transaction'
});

module.exports = AccountTransaction;