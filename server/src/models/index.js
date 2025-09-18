const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    "dialect": "postgres",
    "logging": false
});

const User = require('./user.model')(sequelize);
const RefreshToken = require('./refreshToken.model')(sequelize);

User.hasMany(RefreshToken, { foreignKey: 'userId', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, RefreshToken };