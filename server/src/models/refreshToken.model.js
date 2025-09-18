const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RefreshToken = sequelize.define('RefreshToken', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tokenHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'token_hash'
    },
    userAgent: {
        type: DataTypes.STRING,
        field: 'user_agent'
    },
    ip: {
        type: DataTypes.STRING,
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    expiresAt: {
        type: DataTypes.DATE,
        field: 'expires_at'
    }
    }, {
        tableName: 'refresh_tokens',
        timestamps: false,
    });

    return RefreshToken;
};