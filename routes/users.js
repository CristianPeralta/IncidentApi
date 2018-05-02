import userController from '../controllers/userController'
import express from 'express'
import middleware from '../middleware'

const router = express.Router()

// router.use(middleware.verify)
/* GET users listing. */

router.get('/', middleware.verify, userController.read)
router.get('/me', middleware.verify, userController.getUser)
router.get('/filter', middleware.verify, userController.readBy)
router.get('/:id', middleware.verify, userController.getOne)

router.post('/', userController.create)
router.put('/', middleware.verify, userController.update)
router.delete('/:id', middleware.verify, userController.delete)

module.exports = router
