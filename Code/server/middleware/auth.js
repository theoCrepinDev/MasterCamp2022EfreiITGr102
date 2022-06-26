const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        req.userCNI = decoded.userCNI;
        if(req.body.userCNI && req.body.userCNI !== userCNI){
            throw 'User not authenticated';
        }else{
            next();
        }
    } catch (error) {
        return res.status(401).json({
        message: 'Auth failed',
        error: new Error('Auth failed'),
        userCNI: '',
        token: ''

        });
    }
    }