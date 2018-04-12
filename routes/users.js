import userController from '../controllers/userController'
import express from 'express'

const router = express.Router()

/* GET users listing. */

router.get('/', userController.read)
router.get('/{id}', userController.getOne)
router.get('/filter', userController.readBy)

router.post('/', userController.create)
router.put('/{id}', userController.update)
router.delete('/{id}', userController.delete)

module.exports = router
