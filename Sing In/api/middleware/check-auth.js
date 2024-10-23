const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ msg: 'Token missing' });
        }

        const [type, token] = authorization.split(' ');

        if (type !== 'Bearer') {
            return res.status(401).json({ msg: 'Invalid token format' });
        }

        const verify = jwt.verify(token, 'this is demo user api');

        if (!verify) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        const expiredAt = verify.exp * 1000;
        const isExpired = new Date(expiredAt) < new Date();

        if (isExpired) {
            return res.status(401).json({ msg: 'Token expired' });
        }

        req.user = verify;
        next();
    } catch (err) {
        console.log(err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token' });
        } else {
            return res.status(401).json({ msg: 'Token verification failed' });
        }
    }
};
