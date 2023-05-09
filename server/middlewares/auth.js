const jwt = require('jsonwebtoken')


const auth = async(req,res,next) => {
    console.log('adsfjajfb')
    try {
        const authHeader = req.headers['authorization'] || req.headers.Authorization           
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
            if(err) return res.sendStatus(403) //Invalid Token
            req.userId = decoded?.id
            next();
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = auth