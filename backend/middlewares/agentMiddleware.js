const agentMiddleware = (req, res, next) => {
    if (req.user.role === 'agent') {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = agentMiddleware;