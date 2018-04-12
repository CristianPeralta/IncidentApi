import dependenceController from '../controllers/dependenceController'
import express from 'express'

const router = express.Router()

/* GET dependences listing. */

router.get('/', dependenceController.read)
router.get('/{id}', dependenceController.getOne)
router.get('/filter', dependenceController.readBy)

router.post('/', dependenceController.create)
router.put('/{id}', dependenceController.update)
router.delete('/{id}', dependenceController.delete)

module.exports = router
