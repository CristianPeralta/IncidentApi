import dependenceController from '../controllers/dependenceController'
import express from 'express'

const router = express.Router()

/* GET dependences listing. */

router.get('/', dependenceController.read)
router.get('/{id}', dependenceController.getOne)
router.get('/filter', dependenceController.readBy)

router.post('/', dependenceController.create)
router.post('/update/{id}', dependenceController.update)
router.post('/delete/{id}', dependenceController.delete)

module.exports = router
