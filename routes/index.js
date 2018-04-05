import userController from '../controllers/userController'
import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Incident API' });
});

router.post('/login', userController.login)


module.exports = router
