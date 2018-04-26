import jwt from 'jsonwebtoken'
 // route middleware to verify a token
exports.verify = function (req, res, next) {

   // check header or url parameters or post parameters for token
   var token = req.headers['x-access-token'];

   // decode token
   if (token) {

     // verifies secret and checks exp
     try {
       var decoded = jwt.verify(token, 'apisecretkeyincident');
       req.user = decoded.id
       next();
     } catch(err) {
       // err
       console.log(err)
       return res.sendStatus(401)
     }

   } else {

     // if there is no token
     // return an error
     return res.status(403).send({
         success: false,
         message: 'No token provided.'
     });

   }
 }
