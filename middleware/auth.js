const jwt = require('jsonwebtoken')
const config = require('config')


//middleware function, to test is we need protected route
module.exports = function (req, res, next) {
    
    //Get token from header
    const token = req.header('x-auth-token')
    if (!token){
        res.status(401).json({msg: 'No token, authorization denied!'})
    }

    //we have token 
    try {
        // decoded <==> payload
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //the user will have access to protected route
        req.user = decoded.user
        next()
        //if jwt.verify fails
    } catch (err) {
        console.log(err.message)
        res.status(401).json({msg: 'token is not valid'})
    }
}