exports.verifyAdmin = (req, res, next) => {
    if (req.user?.userRole === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};