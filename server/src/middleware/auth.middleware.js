const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function verifyTokenAndGetUser(token) {
    if (!token) throw new Error('No token provided');

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findOne({ where: { public_id: payload.sub } }); // TODO move db call to service
    if (!user) throw new Error('User not found');

    return { public_id: user.public_id, username: user.username };
}

/**  Middleware for express protected routes */
async function requireAuth(req, res, next) {
    try {
        const authHeader = req.get('Authorization') || '';
        const match = authHeader.match(/^Bearer (.+)$/);
        if (!match) return res.status(401).json({ error: 'Missing token' });

        req.user = await verifyTokenAndGetUser(match[1]);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

/** Middleware socketio auth */
async function socketAuthMiddleware(socket, next) {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error('No token'));

        socket.user = await verifyTokenAndGetUser(token);
        next();
    } catch (err) {
        next(new Error('Invalid token'));
    }
}

module.exports = { requireAuth, socketAuthMiddleware };