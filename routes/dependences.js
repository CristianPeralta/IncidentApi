import dependenceController from '../controllers/dependenceController'
import express from 'express'
import multer from 'multer'

const router = express.Router()

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, path.extname(file.originalname) + Date.now())
  }
});

var upload = multer({ storage: storage });

/* GET dependences listing. */

router.get('/', dependenceController.read)
router.get('/{id}', dependenceController.getOne)
router.get('/filter', dependenceController.readBy)

router.post('/', upload.single('photo'), dependenceController.create)
router.put('/{id}', dependenceController.update)
router.delete('/{id}', dependenceController.delete)

module.exports = router
