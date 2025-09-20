const authService = require('../services/auth.service');

const COOKIE_OPTIONS = (maxAgeMs) => ({
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'Strict',
    path: '/auth/refresh',
    maxAge: maxAgeMs
});

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: 'Username + Email + password required' });
        const user = await authService.createUser(username, email, password);
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const ip = req.ip;
        const ua = req.get('User-Agent');
        const { accessToken, refreshToken, user } = await authService.login(email, password, ip, ua);
        const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS(maxAge));
        res.json({ accessToken, user });
    } catch (err) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

async function refresh(req, res) {
    try {
        const oldToken = req.cookies.refreshToken;
        if (!oldToken) return res.status(401).json({ error: 'No refresh token' });
        const { accessToken, refreshToken, user } = await authService.refresh(oldToken);
        const maxAge = 1000 * 60 * 60 * 24 * 30;
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS(maxAge));
        res.json({ accessToken, user });
    } catch (err) {
        res.status(401).json({ error: 'Invalid refresh' });
    }
}

async function logout(req, res) {
    try {
        const token = req.cookies.refreshToken;
        if (token) await authService.revokeRefreshToken(token);
        res.clearCookie('refreshToken', { path: '/auth/refresh' });
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Could not logout' });
    }
}

module.exports = { register, login, refresh, logout };