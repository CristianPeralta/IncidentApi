import dependenceController from '../controllers/dependenceController'
import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + file.originalname)
  }
});

var upload = multer({ storage: storage })

/* GET dependences listing. */

router.get('/', dependenceController.read)
router.get('/{id}', dependenceController.getOne)
router.get('/filter', dependenceController.readBy)

router.post('/', upload.single('photo'), dependenceController.create)
router.put('/', upload.single('photo'), dependenceController.update)
router.delete('/{id}', dependenceController.delete)

module.exports = router
