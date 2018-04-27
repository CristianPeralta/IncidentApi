import userController from '../controllers/userController'
import express from 'express'
import middleware from '../middleware'

const router = express.Router()

router.use(middleware.verify)
/* GET users listing. */

router.get('/', userController.read)
router.get('/me', userController.getUser)
router.get('/filter', userController.readBy)
router.get('/:id', userController.getOne)

router.post('/', userController.create)
router.put('/', userController.update)
router.delete('/:id', userController.delete)

module.exports = router
