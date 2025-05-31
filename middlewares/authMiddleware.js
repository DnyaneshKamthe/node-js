const { verifyToken } = require('../utils/jwt');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ message: 'Invalid or expired token' });

    req.user = decoded; // attach user info to request object
    next();
};

module.exports = authenticateJWT;
