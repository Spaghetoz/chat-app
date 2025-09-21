const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_NAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres",
    "logging": false, 
});

const User = require('./user.model')(sequelize);
const RefreshToken = require('./refreshToken.model')(sequelize);

User.hasMany(RefreshToken, { foreignKey: 'userId', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, RefreshToken };