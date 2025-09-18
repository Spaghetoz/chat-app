const { User, RefreshToken } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { hashToken } = require('../utils/crypto');

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '30d';

function parseDurationToMs(str) {
    if (!str) return 0;
    if (str.endsWith('ms')) return parseInt(str);
    if (str.endsWith('s')) return parseInt(str) * 1000;
    if (str.endsWith('m')) return parseInt(str) * 60 * 1000;
    if (str.endsWith('h')) return parseInt(str) * 60 * 60 * 1000;
    if (str.endsWith('d')) return parseInt(str) * 24 * 60 * 60 * 1000;
    return parseInt(str);
}

function generateAccessToken(user) {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function generateRefreshTokenPlain() {
    return uuidv4() + ':' + uuidv4();
}

async function createUser(email, password) {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('Email already used');
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash });
    return { id: user.id, email: user.email };
}

async function findUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

async function saveRefreshToken(userId, refreshToken, ip, ua) {
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + parseDurationToMs(REFRESH_EXPIRES));
    await RefreshToken.create({ id: uuidv4(), userId, tokenHash, userAgent: ua || null, ip: ip || null, revoked: false, expiresAt });
}

async function revokeRefreshToken(refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await RefreshToken.update({ revoked: true }, { where: { tokenHash } });
}

async function rotateRefreshToken(oldToken, userId, ip, ua) {
    const oldHash = hashToken(oldToken);
    const tokenRow = await RefreshToken.findOne({ where: { tokenHash: oldHash } });
    if (!tokenRow || tokenRow.revoked) throw new Error('Invalid refresh token');
    if (new Date(tokenRow.expiresAt) < new Date()) throw new Error('Token expired');
    // revoke old
    await tokenRow.update({ revoked: true });
    // create new
    const newToken = generateRefreshTokenPlain();
    await saveRefreshToken(userId, newToken, ip, ua);
    return newToken;
}

async function login(email, password, ip, ua) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshTokenPlain();
    await saveRefreshToken(user.id, refreshToken, ip, ua);
    return { accessToken, refreshToken, user: { id: user.id, email: user.email } };
}

async function refresh(oldRefreshToken) {
    const oldHash = hashToken(oldRefreshToken);
    const tokenRow = await RefreshToken.findOne({ where: { tokenHash: oldHash } });
    if (!tokenRow) throw new Error('Invalid refresh token');
    if (tokenRow.revoked) throw new Error('Token revoked');
    if (new Date(tokenRow.expiresAt) < new Date()) throw new Error('Token expired');

    const user = await User.findByPk(tokenRow.userId);
    if (!user) throw new Error('User not found');

    const newRefreshToken = await rotateRefreshToken(oldRefreshToken, user.id, tokenRow.ip, tokenRow.userAgent);
    const accessToken = generateAccessToken(user);
    return { accessToken, refreshToken: newRefreshToken, user: { id: user.id, email: user.email } };
}

module.exports = { createUser, login, refresh, revokeRefreshToken };