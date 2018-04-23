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
       return res.json(token)
     } catch(err) {
       // err
       return res.sendStatus(500)
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
