import incidentController from '../controllers/incidentController'
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

router.get('/', incidentController.read)
router.get('/:id', incidentController.getOne)
router.get('/filter', incidentController.readBy)

router.post('/', upload.single('photo'), incidentController.create)
router.put('/', upload.single('photo'), incidentController.update)
router.delete('/:id', incidentController.delete)

module.exports = router
