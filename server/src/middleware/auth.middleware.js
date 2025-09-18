const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    const auth = req.get('Authorization') || '';
    const m = auth.match(/^Bearer (.+)$/);
    if (!m) return res.status(401).json({ error: 'Missing token' });
    const token = m[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = { id: payload.sub, email: payload.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { requireAuth };