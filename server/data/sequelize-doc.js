const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
var sequelize = new Sequelize(process.env.DB_URI);
var Doctor = sequelize.define('doctors',
    {
        id: {
            type: Sequelize.STRING,
            field: 'id',
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            field: 'cName' // field name in database
        },
        post: {
            type: Sequelize.STRING,
            field: 'cPost'
        },
        exp: {
            type: Sequelize.STRING,
            field: 'iExperience'
        },
        image: {
            type: Sequelize.STRING,
            field: 'cImage'
        }
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);

module.exports = Doctor
