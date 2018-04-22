import userController from '../controllers/userController'
import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'apisecretkeyincident'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        console.log(decoded)
        next();
      }
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
)
/* GET users listing. */

router.get('/', userController.read)
router.get('/{id}', userController.getOne)
router.get('/filter', userController.readBy)

router.post('/', userController.create)
router.put('/', userController.update)
router.delete('/{id}', userController.delete)

module.exports = router
