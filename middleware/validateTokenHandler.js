const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    
    let token;
   let authHeader = req.headers.authorization || req.headers.Authorization;
   if (authHeader && authHeader.startsWith('Bearer')) {
       token = authHeader.split(' ')[1];
       jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
           if (err) {
               res.status(401);
               throw new Error('Not authorized, token failed or expired');
           }
           req.user = decode.user;
           console.log(req.user);
           next();
       });
   }
   if(!token){
       res.status(401);
       throw new Error('Not authorized, no token');
   }
});
module.exports = validateTokenHandler;